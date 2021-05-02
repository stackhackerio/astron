import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { UserContextProvider } from '@/utils/useUser'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  )
}
