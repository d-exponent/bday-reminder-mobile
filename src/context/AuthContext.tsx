import LocalStorage from 'helpers/api/localStorage'
import React, { createContext, useEffect, useState } from 'react'
import { type IReactChildren, type IAuthValue } from '../../@types.birthday'
import { axiosRefresh } from '../helpers/api/axios'
import { accessTokenStore, refreshTokenStore } from '../helpers/api/tokenStorage'

const AuthContext = createContext<IAuthValue | null>(null)

const AuthContextProvider = (props: IReactChildren) => {
  const [authStatus, setAuthStatus] = useState<boolean | null>(null)

  useEffect(() => {
    let aborter = () => {} // See line 21 and 38

    const handleAuthStatus = async () => {
      if (authStatus === null) {
        try {
          const { promise, abort } = await axiosRefresh()
          aborter = abort
          const resposne = await promise

          const settled = await Promise.allSettled([
            refreshTokenStore.save(resposne.data.refreshToken),
            accessTokenStore.save(resposne.data.accessToken)
          ])

          // Authentication fails if refresh token doesn't save successfully
          if (settled[0].status === 'rejected') throw new Error('')
          setAuthStatus(true)
        } catch (e) {
          setAuthStatus(false)
        }
      }
    }

    void handleAuthStatus()
    return aborter
  }, [])

  const handleLogout = async () => {
    try {
      await LocalStorage.removeAll()
      setAuthStatus(false)
    } catch (e) {
      setAuthStatus(false)
    }
  }

  const values: IAuthValue = {
    status: authStatus,
    logout: handleLogout,
    setStatus: (status: boolean): void => {
      setAuthStatus(status)
    }
  }

  return (
    <AuthContext.Provider value={values}>
      <>{props.children}</>
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider as default, type IAuthValue }
