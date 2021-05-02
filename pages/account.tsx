import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Spinner from '@/components/ui/Spinner'
import { useUser } from '@/utils/useUser'
import { postData } from '@/utils/helpers'

export default function Account() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { userLoaded, user, session, userDetails, subscription } = useUser()

  useEffect(() => {
    if (!user) router.replace('/signin')
  }, [user])

  const redirectToCustomerPortal = async () => {
    setLoading(true)
    const { url, error } = await postData({
      url: '/api/create-portal-link',
      token: session.access_token,
    })
    if (error) return alert(error.message)
    window.location.assign(url)
    setLoading(false)
  }

  const subscriptionName = subscription && subscription.prices.products.name
  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription.prices.currency,
      minimumFractionDigits: 0,
    }).format(subscription.prices.unit_amount)
  const translations: { [key: string]: string } = { month: '月', year: '年' }
  const subscriptionInterval =
    subscription && translations[subscription.prices.interval]

  return (
    <section>
      <div className="pb-10 bg-gray-100 px-2">
        <div className="max-w-7xl px-4 pt-20 mx-auto text-center">
          <h1 className="mb-3 text-4xl font-bold leading-tight text-gray-900 md:text-5xl md:font-extrabold">
            アカウント
          </h1>
          <p className="mb-10 text-lg text-gray-600 md:text-xl">
            請求はStripeにより提供されます。
          </p>
        </div>
        <div className="max-w-3xl w-full m-auto my-8">
          <div className="card">
            <div className="card-header">プラン</div>
            <div className="card-body">
              {!userLoaded ? (
                <Spinner />
              ) : subscriptionName && subscriptionPrice ? (
                <p>
                  {console.log(subscription)}
                  サブスクリプションプラン: {subscriptionName}
                  <br />
                  {subscriptionPrice}/{subscriptionInterval}
                  <br />
                  <span className="text-sm text-gray-600">
                    サブスクリプションプランはStripeにて管理してください
                  </span>
                </p>
              ) : (
                <p>
                  サブスクリプションプランはありません
                  <br />
                  <span className="text-sm text-gray-600">
                    プランを選択してください
                  </span>
                </p>
              )}
            </div>
            <div className="bg-transparent border-t card-footer">
              {subscriptionName && subscriptionPrice ? (
                <button
                  className="btn btn-primary"
                  disabled={loading || !subscription}
                  onClick={redirectToCustomerPortal}
                >
                  Stripeポータルを開く
                </button>
              ) : (
                <Link href="/pricing">
                  <a className="btn btn-primary">プランを選択する</a>
                </Link>
              )}
            </div>
          </div>
          <div className="max-w-3xl w-full m-auto my-8">
            <div className="card">
              <div className="card-header">お名前</div>
              <div className="card-body">
                {userDetails ? (
                  <p>
                    {userDetails?.full_name ?? ''}
                    <br />
                    <span className="text-sm text-gray-600">
                      画面に表示するために使用します。
                    </span>
                  </p>
                ) : (
                  <Spinner />
                )}
              </div>
              <div className="bg-transparent border-t card-footer">
                <p>最大64文字までの文字列を指定できます。</p>
              </div>
            </div>
          </div>
          <div className="max-w-3xl w-full m-auto my-8">
            <div className="card">
              <div className="card-header">メールアドレス</div>
              <div className="card-body">
                <p>
                  {user ? user.email : undefined}
                  <br />
                  <span className="text-sm text-gray-600">
                    ログインに使用するメールアドレスを入力してください
                  </span>
                </p>
              </div>
              <div className="bg-transparent border-t card-footer">
                <p>
                  メールアドレスを変更するには、送信されたメールの確認が必要です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
