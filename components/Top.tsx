import Link from 'next/link'
import ArrowRight from '@/components/icons/ArrowRight'
import Pointer from '@/components/icons/Pointer'
import Heart from '@/components/icons/Heart'
import Fire from '@/components/icons/Fire'
import Inbox from '@/components/icons/Inbox'

export default function Top() {
  return (
    <main>
      <section className="px-4 mx-auto max-w-7xl md:py-24 py-8">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
            技術スタックを
            <span className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline sm:py-1">
              一箇所に集約
            </span>
            できます。
          </h1>
          <p className="px-0 mb-6 text-lg text-gray-600 md:text-xl lg:px-24">
            stacksはすべての技術スタックの情報や操作を一箇所で行う事ができます。利用料金を確認したり、商品の登録や注文の管理を一つの管理画面で行う事ができます。
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            <Link href="/signup">
              <a className="inline-flex items-center justify-center w-full mb-2 btn btn-primary btn-lg sm:w-auto sm:mb-0">
                すぐにはじめる
                <ArrowRight />
              </a>
            </Link>
            <a
              className="inline-flex items-center justify-center w-full mb-2 btn btn-light btn-lg sm:w-auto sm:mb-0"
              href="/"
            >
              デモを予約
              <Pointer />
            </a>
          </div>
        </div>
        <div className="w-full mx-auto mt-10 md:mt-20 text-center md:w-10/12">
          <img
            src="hero.png"
            alt="Stacks screenshot"
            className="w-full rounded-lg shadow-2xl"
          />
        </div>
      </section>
      <section id="features" className="px-4 py-16 bg-gray-100">
        <div className="md:text-center mb-12">
          <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">
            機能
          </h2>
          <p className="text-base leading-relaxed text-gray-600 lg:px-64">
            1クリックですぐにスタックを立ち上げることができます。立ち上げてから、月々の利用料金の追跡や、スタックの稼働状況、起動やシャットダウンの操作を一箇所でまとめて管理できます。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-20 mx-auto max-w-7xl lg:px-16 xl:px-24 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Heart />
            <h3 className="mb-3 text-lg font-medium leading-tight text-gray-900">
              支払いを一箇所にまとめる
            </h3>
            <p className="text-base leading-relaxed text-gray-600">
              月々どれだけ利用しているのか、ダッシュボードで簡単に確認することができます。通知の設定ができるので、利用料が多い日でも安心です。
            </p>
          </div>
          <div>
            <Fire />
            <h3 className="mb-3 text-lg font-medium leading-tight text-gray-900">
              3分で構築できます
            </h3>
            <p className="text-base leading-relaxed text-gray-600">
              豊富なテンプレートから選んで、1クリックで新しいスタックを立ち上げることができます。いくつかの質問に答えるだけで完了します。
            </p>
          </div>
          <div>
            <Inbox />
            <h3 className="mb-3 text-lg font-medium leading-tight text-gray-900">
              成長に合わせてスケールします
            </h3>
            <p className="text-base leading-relaxed text-gray-600">
              はじめは少ない予算ではじめて、事業の成長に合わせてコードを一切書き換える事なく簡単にスケールすることができます。
            </p>
          </div>
        </div>
      </section>
      <section className="px-6 py-24 mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 mb-24 md:grid-cols-2 gap-y-10 md:gap-y-32 gap-x-10 md:gap-x-24">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-center text-black md:leading-tight sm:text-left md:text-4xl">
              モバイルに完全対応
            </h2>
            <p className="mb-5 text-base text-center text-gray-600 sm:text-left md:text-lg">
              すべての機能はスマートフォンで操作ができます。通知機能を使えば、どこにいても最新の情報を取得できます。
            </p>
            <a href="/" className="w-full btn btn-dark btn-lg sm:w-auto">
              さらに詳しく
            </a>
          </div>
          <div className="w-full h-full py-48 bg-gray-200"></div>
        </div>
        <div className="grid flex-col-reverse items-center grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-32 gap-x-10 md:gap-x-24">
          <div className="order-none md:order-2">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-center text-black md:leading-tight sm:text-left md:text-4xl">
              リモートワークでも安心
            </h2>
            <p className="mb-5 text-base text-center text-gray-600 sm:text-left md:text-lg">
              メンバ間でのコラボレーションができるので、ナレッジを共有できます。何が起きているのかダッシュボードで管理できるのでリモートでの利用でも安心です。
            </p>
            <a href="/" className="w-full btn btn-dark btn-lg sm:w-auto">
              さらに詳しく
            </a>
          </div>
          <div className="w-full h-full py-48 bg-gray-200"></div>
        </div>
      </section>
      <section className="bg-gray-900">
        <div className="w-full px-4 py-20 mx-auto text-center max-w-7xl md:w-4/5 lg:w-4/6">
          <h1 className="mt-3 mb-10 text-xl font-extrabold text-white md:leading-snug md:text-3xl">
            “すばらしい製品です。stackチームは、
            <span className="text-white bg-transparent bg-clip-border xl:bg-clip-text xl:text-transparent xl:bg-gradient-to-r from-green-400 to-purple-500">
              すごく早いレスポンスで、適切なサポートを提供
            </span>
            してくれます。そのお陰で、自分たちのビジネスに専念することができ、成長することができました。“
          </h1>
          <div className="mx-auto mb-3 shadow-lg avatar">
            <img
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Praveen Juge"
            />
          </div>
          <p className="text-base font-medium text-gray-200">鈴木樹</p>
          <p className="text-xs font-medium text-gray-400">CEO, Birds</p>
        </div>
      </section>
    </main>
  )
}
