/* eslint-disable @typescript-eslint/return-await */
import React from 'react'

import baseAxios from 'helpers/api/axios'
import { axiosRefresh } from '../helpers/api/axios'
import {
  accessTokenStore as ats,
  handleSaveTokens
} from '../helpers/api/tokenStorage'

const useAxiosPrivate = () => {
  // Attach access token to the outgoing request if absent
  React.useEffect(() => {
    const requestInterceptor = baseAxios.interceptors.request.use(
      async config => {
        const hasAuthHeader = typeof config.headers?.Authorization === 'string'
        let token
        try {
          if (!hasAuthHeader && (token = await ats.getToken()) !== null) {
            config.headers.Authorization = 'Bearer ' + token
          }
        } catch (_) {}
        return config
      },
      error => error
    )

    return () => {
      baseAxios.interceptors.request.eject(requestInterceptor)
    }
  }, [])

  // Attach access token on prev Request on 401 server response status code
  React.useEffect(() => {
    let responseAborter = () => {}

    const responseInterceptor = baseAxios.interceptors.response.use(
      resposne => resposne,

      // Attach new access token to the error response and try again on 401 status code response
      async error => {
        const previousRequest = error.config
        if (previousRequest?._retry !== true && error.response?.status === 401) {
          previousRequest._retry = true
          try {
            const { promise, abort } = await axiosRefresh()
            responseAborter = abort

            const { data } = await promise

            console.log('🛑 Axios Private Response Interceptor FIle', data) // TODO: remove

            if ('accessToken' in data) {
              previousRequest.headers.Authorization = 'Bearer ' + data.accessToken

              await handleSaveTokens({
                refreshToken: data.refreshToken,
                accessToken: data.accessToken
              })
            }
            return baseAxios(previousRequest)
          } catch (_) {}
        }
        return Promise.reject(error)
      }
    )

    return () => {
      baseAxios.interceptors.response.eject(responseInterceptor)
      responseAborter()
    }
  }, [])

  return baseAxios
}

export default useAxiosPrivate
