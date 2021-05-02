import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const meta = {
    title: 'Next.jsサブスクリプションスターター',
    description: 'Vercel, StripeとSupabaseで構築するサブスクリプションサイト。',
    cardImage: '/og.png',
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://subscription-starter.vercel.app${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
      </Head>
      <Navbar />
      <main id="skip">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
