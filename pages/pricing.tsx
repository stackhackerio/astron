import { FC } from 'react'
import Pricing from '@/components/Pricing'
import { getActiveProductsWithPrices } from '@/utils/supabase-client'

type Props = {
  products: [any]
  children: never
}

const PricingPage: FC<Props> = ({ products }) => {
  return <Pricing products={products} />
}

export async function getStaticProps() {
  const products = await getActiveProductsWithPrices()

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}

export default PricingPage
