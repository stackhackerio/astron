import Link from 'next/link'

import Logo from '@/components/icons/Logo'
import ProfileMenu from '@/components/ui/ProfileMenu'
import MobileMenu from '@/components/ui/MobileMenu'
import { useUser } from '@/utils/useUser'

const Navbar = () => {
  const { user } = useUser()

  return (
    <header className="z-30 w-full px-2 py-4 bg-white sm:px-4">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center space-x-3">
          <a href="/" title="Stacks Home Page" className="flex items-center">
            <Logo />
          </a>
          <div className="hidden space-x-1 md:inline-flex">
            <Link href="/#features">
              <a className="btn btn-sm btn-link">機能</a>
            </Link>
            <Link href="/pricing">
              <a className="btn btn-sm btn-link">料金</a>
            </Link>
          </div>
        </div>
        <div className="flex hidden items-center space-x-1 md:inline-flex">
          {user ? (
            <ProfileMenu />
          ) : (
            <>
              <Link href="/signin">
                <a className="btn btn-sm btn-link">サインイン</a>
              </Link>
              <Link href="/signup">
                <a className="btn btn-sm btn-primary ml-1">登録</a>
              </Link>
            </>
          )}
        </div>
        <div className="inline-flex md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

export default Navbar
