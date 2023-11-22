/* eslint-disable @typescript-eslint/return-await */
import React from 'react'

import baseAxios from 'helpers/api/axios'
import { axiosRefresh } from '../helpers/api/axios'
import { accessTokenStore as ats } from '../helpers/api/tokenStorage'

const useAxiosPrivate = () => {
  // Attach access token to the outgoing request
  React.useEffect(() => {
    const requestInterceptor = baseAxios.interceptors.request.use(
      async config => {
        const hasAuthHeader = Boolean(config.headers?.Authorization)
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
        const previousRequest = error.config // Previous request object
        if (previousRequest?._retry !== true && error.response?.status === 401) {
          previousRequest._retry = true
          try {
            const { promise, abort } = await axiosRefresh()
            responseAborter = abort

            const {
              data: { accessToken }
            } = await promise

            if (typeof accessToken === 'string' && accessToken.length > 0) {
              previousRequest.headers.Authorization = 'Bearer ' + accessToken
              return baseAxios(previousRequest)
            }
          } catch (_) {}
        }
        return Promise.reject(error)
      }
    )

    return () => {
      responseAborter()
      baseAxios.interceptors.response.eject(responseInterceptor)
    }
  }, [])
  return baseAxios
}

export default useAxiosPrivate
