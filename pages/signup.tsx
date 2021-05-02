import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

import Input from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'
import Info from '@/components/icons/Info'
import Alert from '@/components/icons/Alert'
import { updateUserName } from '@/utils/supabase-client'
import { useUser } from '@/utils/useUser'

const SignUp = () => {
  const [newUser, setNewUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })
  const router = useRouter()
  const { user, signUp } = useUser()

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setMessage({ type: '', content: '' })
    const { error, user } = signUp({ email, password })
    if (error) {
      setMessage({ type: 'error', content: error.message })
    } else {
      if (user) {
        await updateUserName(user, name)
        setNewUser(user)
      } else {
        setMessage({
          type: 'note',
          content: '確認メールを送信しました。メールを確認してください。',
        })
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user || newUser) {
      router.replace('/account')
    }
  }, [user, newUser])

  return (
    <section className="px-4 py-24 mx-auto max-w-7xl">
      <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
        <h1 className="text-4xl font-semibold text-center text-gray-900">
          登録
        </h1>
        {message.content && (
          <div
            className={`alert ${
              message.type === 'error' ? 'text-red-700' : 'text-primary'
            } ${message.type === 'error' ? 'bg-red-100' : 'bg-primary-light'}`}
          >
            {message.type === 'error' ? <Alert /> : <Info />}
            <span>{message.content}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <label className="block">
            <span className="block mb-1 text-xs font-medium text-gray-700">
              お名前
            </span>
            <Input className="form-input" onChange={setName} required />
          </label>
          <label className="block">
            <span className="block mb-1 text-xs font-medium text-gray-700">
              メールアドレス
            </span>
            <Input
              className="form-input"
              type="email"
              onChange={setEmail}
              required
            />
          </label>
          <label className="block">
            <span className="block mb-1 text-xs font-medium text-gray-700">
              パスワード
            </span>
            <Input
              type="password"
              className="form-input"
              onChange={setPassword}
            />
          </label>
          <button
            type="submit"
            className="w-full py-3 btn btn-primary"
            disabled={
              loading || !name.length || !email.length || !password.length
            }
          >
            {loading && <Spinner />} <span>登録</span>
          </button>
        </form>
        <div className="text-center">
          <span className="text-sm text-gray-700">
            すでにアカウントをお持ちですか？
          </span>
          <Link href="/signin">
            <a
              href="#"
              className="text-sm text-gray-700 hover:underline font-bold"
            >
              サインインする
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SignUp
