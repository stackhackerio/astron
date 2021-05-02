import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'
import { Menu } from '@headlessui/react'
import { definitions } from '@/types/supabase'

import { useUser } from '@/utils/useUser'
import User from '@/components/icons/User'
import { FC } from 'react'

const Avatar: FC<{ userDetails: definitions['users'] }> = ({ userDetails }) => {
  const src = userDetails?.avatar_url
  return src ? <img src={src} alt="Avatar" /> : <User />
}

export default function MobileMenu() {
  const { user, signOut, userDetails } = useUser()
  const router = useRouter()
  //user.user_metadata.avatar_url

  const handleAccountLink = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/account')
  }

  return (
    <div className="flex items-center">
      <div className="relative text-left">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className="p-0 rounded-full btn btn-white">
                <div className="avatar avatar-sm">
                  <Avatar userDetails={userDetails} />
                </div>
              </Menu.Button>
              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">サインインユーザ</p>
                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={handleAccountLink}
                          className={`${
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          アカウント設定
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => signOut()}
                          href="#"
                          className={`${
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          サインアウト
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  )
}
