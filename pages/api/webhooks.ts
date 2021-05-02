import { stripe } from '@/utils/stripe'
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
} from '@/utils/useDatabase'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Stripe } from 'stripe'

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: NextApiRequest) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']
    const webhookSecret =
      process.env.STRIPE_WEBHOOK_SECRET_LIVE! ??
      process.env.STRIPE_WEBHOOK_SECRET
    let event

    if (typeof sig !== 'string') throw new Error()

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case 'product.created':
          case 'product.updated':
            await upsertProductRecord(event.data.object)
            break
          case 'price.created':
          case 'price.updated':
            await upsertPriceRecord(event.data.object)
            break
          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = <Stripe.Subscription>event.data.object
            await manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer as string,
              event.type === 'customer.subscription.created'
            )
            break
          case 'checkout.session.completed':
            const checkoutSession = <Stripe.Checkout.Session>event.data.object
            if (checkoutSession.mode === 'subscription') {
              const subscription = <Stripe.Subscription>(
                checkoutSession.subscription
              )
              await manageSubscriptionStatusChange(
                subscription.id,
                subscription.customer as string,
                true
              )
            }
            break
          default:
            throw new Error('Unhandled relevant event!')
        }
      } catch (error) {
        console.log(error)
        return res.json({ error: 'Webhook handler failed. View logs.' })
      }
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default webhookHandler
