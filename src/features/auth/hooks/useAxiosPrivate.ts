/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import baseAxios from 'helpers/api/axios'
import { useEffect } from 'react'
import axiosRefresh from '../utils/axiosRefresh'
import { accessTokenStore as ats } from '../utils/tokenStorage'

const useAxiosPrivate = () => {
  useEffect(() => {
    // Attach access token to the outgoing request
    const requestInterceptor = baseAxios.interceptors.request.use(
      async config => {
        const { Authorization } = config.headers
        let token: string | null = null
        try {
          if (!Authorization && (token = await ats.getToken()) !== null) {
            config.headers.Authorization = 'Bearer ' + token
          }
        } catch (_) {
          /***/
        }
        return config
      },
      error => error
    )

    return () => {
      baseAxios.interceptors.request.eject(requestInterceptor)
    }
  }, [])

  useEffect(() => {
    // Attach new access token to the error response and try again on 401 status resposne
    let responseAborter = () => {}

    const responseInterceptor = baseAxios.interceptors.response.use(
      resposne => resposne,
      async error => {
        const previousRequest = error.config
        if (!previousRequest._retry && error.response?.status === 401) {
          previousRequest._retry = true

          try {
            const { promise, abort } = await axiosRefresh()

            responseAborter = abort
            const { data } = await promise
            const newAccessToken = data?.accessToken

            if (newAccessToken) {
              previousRequest.headers.Authorization = 'Bearer ' + newAccessToken
              return baseAxios(previousRequest)
            }
          } catch (error) {
            /** */
          }
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
