import LocalStorage from 'helpers/api/localStorage'
import React, { createContext, useEffect, useState, type ReactNode } from 'react'
import { type IReactChildren } from '../../../../@types.birthday'
import axiosRefresh from '../utils/axiosRefresh'
import { accessTokenStore, refreshTokenStore } from '../utils/tokenStorage'

type authStatus = boolean | null
type setStatus = (status: boolean) => void

interface IAuthContext {
  status: authStatus
  setStatus: setStatus
  logout: () => Promise<void>
}

const AuthContext = createContext<IAuthContext | null>(null)

const AuthContextProvider = (props: IReactChildren): ReactNode => {
  const [authStatus, setAuthStatus] = useState<authStatus>(null)

  useEffect(() => {
    const aborter = { abort: () => {} }

    const handleAuthStatus = async () => {
      if (authStatus === null) {
        try {
          const { promise, abort } = await axiosRefresh()
          aborter.abort = abort
          const { data } = await promise
          const settled = await Promise.allSettled([
            refreshTokenStore.save(data.refreshToken),
            accessTokenStore.save(data.accessToken)
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
    return aborter.abort
  }, [])

  const handleLogout = async () => {
    try {
      await LocalStorage.removeAll()
      setAuthStatus(false)
    } catch (e) {
      /** */
    }
  }

  const values: IAuthContext = {
    status: authStatus,
    logout: handleLogout,
    setStatus: (status: boolean): void => {
      setAuthStatus(status)
    }
  }

  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider as default, type IAuthContext }
