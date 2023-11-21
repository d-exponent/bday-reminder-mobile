/* eslint-disable @typescript-eslint/return-await */
import React from 'react'

import baseAxios from 'helpers/api/axios'
import { axiosRefresh } from '../helpers/api/axios'
import { accessTokenStore as ats } from '../helpers/api/tokenStorage'

const useAxiosPrivate = () => {
  React.useEffect(() => {
    // Attach access token to the outgoing request
    const requestInterceptor = baseAxios.interceptors.request.use(
      async config => {
        const hasAuthHeader = Boolean(config.headers?.Authorization)
        let token
        try {
          if (!hasAuthHeader && (token = await ats.getToken()) != null) {
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

  React.useEffect(() => {
    let responseAborter = () => {} // see Line 59

    const responseInterceptor = baseAxios.interceptors.response.use(
      resposne => resposne,

      // Attach new access token to the error response and try again on 401 status code response
      async error => {
        const previousRequest = error.config
        if (previousRequest?._retry !== true && error.response?.status === 401) {
          previousRequest._retry = true
          let newAccessToken

          try {
            const { promise, abort } = await axiosRefresh()
            responseAborter = abort

            if ((newAccessToken = (await promise)?.data?.accessToken) != null) {
              previousRequest.headers.Authorization = 'Bearer ' + newAccessToken
              return baseAxios(previousRequest)
            }
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
