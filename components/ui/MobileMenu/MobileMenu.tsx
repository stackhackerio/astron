import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'

import Menu from '@/components/icons/Menu'
import Close from '@/components/icons/Close'
import { useUser } from '@/utils/useUser'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useUser()

  useEffect(() => {
    return () => {
      isOpen && setIsOpen(false)
    }
  })

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex-none px-2 btn btn-link btn-sm"
      >
        <Menu />
        <span className="sr-only">メニューを開く</span>
      </button>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute top-0 left-0 right-0 z-50 flex flex-col p-2 pb-4 m-2 space-y-3 bg-white rounded shadow">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="self-end flex-none px-2 ml-2 btn btn-link btn-icon"
          >
            <Close />
            <span className="sr-only">メニューを閉じる</span>
          </button>
          <Link href="/#features">
            <a className="w-full btn btn-link">機能</a>
          </Link>
          <Link href="/pricing">
            <a className="w-full btn btn-link">料金</a>
          </Link>
          {user ? (
            <Link href="#">
              <a className="btn btn-sm btn-link" onClick={() => signOut()}>
                サインアウト
              </a>
            </Link>
          ) : (
            <>
              <Link href="/signin">
                <a className="btn btn-sm btn-link">サインイン</a>
              </Link>
              <Link href="/signup">
                <a className="btn btn-sm btn-link">登録</a>
              </Link>
            </>
          )}
        </div>
      </Transition>
    </>
  )
}

export default MobileMenu
