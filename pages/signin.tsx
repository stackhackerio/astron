import Link from 'next/link'
import { useRouter } from 'next/router'
import { EventHandler, FormEvent, useEffect, useState } from 'react'

import type { Provider } from '@supabase/gotrue-js'

import Input from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'
import GitHub from '@/components/icons/GitHub'
import Info from '@/components/icons/Info'
import Alert from '@/components/icons/Alert'
import { useUser } from '@/utils/useUser'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })
  const router = useRouter()
  const { user, signIn } = useUser()

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setMessage({ type: '', content: '' })

    const { error } = signIn({ email, password })
    if (error) {
      setMessage({ type: 'error', content: error.message })
    }
    if (!password) {
      setMessage({
        type: 'note',
        content:
          'マジックリンクのメールを送信しました。メールを確認してください。',
      })
    }
    setLoading(false)
  }

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = signIn({ provider })
    if (error) {
      setMessage({ type: 'error', content: error.message })
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      router.replace('/account')
    }
  }, [user])

  if (!user)
    return (
      <section className="px-4 py-24 mx-auto max-w-7xl">
        <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
          <h1 className="text-4xl font-semibold text-center text-gray-900">
            サインイン
          </h1>
          {message.content && (
            <div
              className={`alert ${
                message.type === 'error' ? 'text-red-700' : 'text-primary'
              } ${
                message.type === 'error' ? 'bg-red-100' : 'bg-primary-light'
              }`}
            >
              {message.type === 'error' ? <Alert /> : <Info />}
              <span>{message.content}</span>
            </div>
          )}

          {!showPasswordInput && (
            <form onSubmit={handleSignin} className="space-y-4">
              <label className="block">
                <span className="block mb-1 text-xs font-medium text-gray-700">
                  メールアドレス
                </span>
                <Input
                  className="form-input"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full py-3 btn btn-primary"
                disabled={!email.length || loading}
              >
                {loading && <Spinner />} <span>マジックリンクを送信</span>
              </button>
            </form>
          )}

          {showPasswordInput && (
            <form onSubmit={handleSignin} className="space-y-4">
              <label className="block">
                <span className="block mb-1 text-xs font-medium text-gray-700">
                  メールアドレス
                </span>
                <Input
                  className="form-input"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                />
              </label>
              <label className="block">
                <span className="block mb-1 text-xs font-medium text-gray-700">
                  パスワード
                </span>
                <Input
                  className="form-input"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full py-3 btn btn-primary"
                disabled={!password.length || !email.length || loading}
              >
                {loading && <Spinner />} <span>サインイン</span>
              </button>
            </form>
          )}

          <div className="text-center">
            <a
              href="#"
              className="text-sm text-gray-700 hover:underline cursor-pointer"
              onClick={() => {
                if (showPasswordInput) setPassword('')
                setShowPasswordInput(!showPasswordInput)
                setMessage({ type: '', content: '' })
              }}
            >
              {`または、${
                showPasswordInput ? 'マジックリンク' : 'パスワード'
              }でサインインする`}
            </a>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-700">登録はまだですか？</span>
            <Link href="/signup">
              <a className="text-sm text-gray-700 hover:underline font-bold">
                登録する
              </a>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="border-t flex-grow mr-3" aria-hidden="true"></div>
            <div className="text-sm text-gray-700">または</div>
            <div className="border-t flex-grow ml-3" aria-hidden="true"></div>
          </div>
          <button
            className="py-3 btn btn-light-primary w-full btn-icon"
            onClick={() => handleOAuthSignIn('github')}
            disabled={loading}
          >
            <GitHub />
            <span className="ml-2">GitHubでサインインする</span>
          </button>
        </div>
      </section>
    )

  return (
    <div className="m-6">
      <Spinner />
    </div>
  )
}

export default SignIn
