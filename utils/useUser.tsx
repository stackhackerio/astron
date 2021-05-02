import { useEffect, useState, createContext, useContext } from 'react'
import { supabase } from './supabase-client'
import { definitions } from '@/types/supabase'

import type { Session } from '@supabase/supabase-js'
import type { UserCredentials } from '@supabase/gotrue-js'

interface Context {
  user: any
  session: Session
  subscription: any
  userLoaded: boolean
  userDetails: any
  signOut(): void
  signIn(userCredentials: UserCredentials): { error: any }
  signUp(userCredentials: UserCredentials): { error: any; user: any }
}

type Options = {
  redirectTo?: string
}

export const UserContext = createContext({} as Context)

export const UserContextProvider = (props: any) => {
  const [userLoaded, setUserLoaded] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<any>(null)
  const [userDetails, setUserDetails] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  const getUserDetails = () =>
    supabase.from<definitions['users']>('users').select('*').single()

  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single()

  useEffect(() => {
    if (user) {
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results: any) => {
          setUserDetails(results[0].value.data)
          setSubscription(results[1].value.data)
          setUserLoaded(true)
        }
      )
    }
  }, [user])

  const value = {
    session,
    user,
    userDetails,
    userLoaded,
    subscription,
    signIn: (userCredentials: UserCredentials) =>
      supabase.auth.signIn(userCredentials),
    signUp: (userCredentials: UserCredentials) =>
      supabase.auth.signUp(userCredentials),
    signOut: () => {
      setUserDetails(null)
      setSubscription(null)
      return supabase.auth.signOut()
    },
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context: Context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}
