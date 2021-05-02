import { FC } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { postData } from '@/utils/helpers'
import { getStripe } from '@/utils/stripe-client'
import { useUser } from '@/utils/useUser'
import Spinner from '@/components/ui/Spinner'

type Props = {
  products: [any]
}

const Pricing: FC<Props> = ({ products }) => {
  const router = useRouter()
  const [billingInterval, setBillingInterval] = useState('month')
  const [priceIdLoading, setPriceIdLoading] = useState<boolean | number>()
  const { session, userLoaded, subscription } = useUser()

  const handleCheckout = async (price: any) => {
    setPriceIdLoading(price.id)
    if (!session) {
      return router.push('/signin')
    }

    if (subscription) {
      return router.push('/account')
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
        token: session.access_token,
      })

      const stripe = await getStripe()
      stripe && stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      return alert(error.message)
    } finally {
      setPriceIdLoading(false)
    }
  }

  if (!products.length)
    return (
      <section className="bg-black">
        <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-6xl font-extrabold text-white sm:text-center sm:text-6xl">
            料金プランが存在しません。
            <a
              className="text-pink underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripeダッシュボード
            </a>
            で作成して下さい。
          </p>
        </div>
      </section>
    )

  return (
    <section>
      <div className="pb-64 bg-gray-100 px-2">
        <div className="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
          <h1 className="mb-3 text-4xl font-bold leading-tight text-gray-900 md:text-5xl md:font-extrabold">
            料金プラン
          </h1>
          <p className="mb-10 text-lg text-gray-600 md:text-xl">
            5分でセットアップ · 14日間無料お試し · クレジットカード不要
          </p>
          <div className="w-64 mx-auto -mb-2 sm:mx-0">
            <div className="flex justify-between p-2 text-center border border-gray-200 rounded-full">
              <button
                onClick={() => setBillingInterval('month')}
                className={`${
                  billingInterval === 'month' ? 'btn-primary' : 'btn-link'
                } w-full rounded-full btn btn-primary`}
              >
                月額支払い
              </button>
              <button
                onClick={() => setBillingInterval('year')}
                className={`${
                  billingInterval === 'year' ? 'btn-primary' : 'btn-link'
                } w-full rounded-full btn btn-primary`}
              >
                年額支払い
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl pb-10 mx-auto -mt-48 px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8">
          {products.map((product) => {
            const price = product.prices.find(
              (price: any) => price.interval === billingInterval
            )
            const priceString = new Intl.NumberFormat('ja-JP', {
              style: 'currency',
              currency: price.currency,
              minimumFractionDigits: 0,
            }).format(price.unit_amount)

            return (
              <div
                key={product.id}
                className="border-0 rounded-none shadow-none card sm:shadow-md sm:rounded-lg"
              >
                <div className="flex flex-col justify-between p-6 border-gray-200">
                  <p className="mb-2 text-lg font-semibold text-gray-700">
                    {product.name}
                  </p>
                  <p className="mb-2 text-gray-700 h-auto lg:h-20">
                    {product.description}
                  </p>
                  <p className="pb-0 text-4xl font-extrabold text-gray-900 md:pb-2">
                    {priceString}
                  </p>
                  <p className="text-base text-gray-600">{price.description}</p>
                  <button
                    onClick={() => handleCheckout(price.id)}
                    className="w-full btn btn-primary btn-lg mt-6"
                    disabled={
                      subscription &&
                      product.name !== subscription?.prices?.products.name
                    }
                  >
                    {priceIdLoading && <Spinner />}
                    {product.name === subscription?.prices?.products.name
                      ? 'お支払いを変更する'
                      : '無料でお試し'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Pricing
