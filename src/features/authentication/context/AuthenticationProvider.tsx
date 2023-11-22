import React from 'react'

import { axiosRefresh } from 'helpers/api/axios'
import {
  accessTokenStore,
  handleSaveTokens,
  refreshTokenStore
} from 'helpers/api/tokenStorage'
import { type ReactChildrenProp } from '../../../../@types.birthday'

interface AuthenticationContextValue {
  authStatus: boolean | null
  changeAuthStatusTo: (status: boolean | null) => void
  logout: () => Promise<void>
}

const AuthenticationContext = React.createContext<AuthenticationContextValue | null>(
  null
)

const AuthenticationProvider = (props: ReactChildrenProp) => {
  const [authStatus, setAuthStatus] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    let aborter = () => {}

    const fetchAuthStatus = async () => {
      if (authStatus === true) return

      try {
        const { promise, abort } = await axiosRefresh()
        aborter = abort
        const response = await promise

        await handleSaveTokens({
          refreshToken: response.data.refreshToken,
          accessToken: response.data.accessToken
        })
        setAuthStatus(true)
      } catch (e) {
        setAuthStatus(false)
      }
    }

    void fetchAuthStatus()
    return aborter
  }, [authStatus])

  const onLogoutPress = async () => {
    try {
      await Promise.allSettled([
        refreshTokenStore.removeToken(),
        accessTokenStore.removeToken()
      ])
    } catch (_) {}
    setAuthStatus(false)
  }

  const contextValue: AuthenticationContextValue = {
    authStatus,
    logout: onLogoutPress,
    changeAuthStatusTo: status => setAuthStatus(status)
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export {
  AuthenticationContext,
  AuthenticationProvider as default,
  type AuthenticationContextValue
}
