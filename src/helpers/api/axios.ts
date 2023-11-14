/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios, { isAxiosError, type AxiosResponse } from 'axios'
import { refreshTokenStore } from './tokenStorage'

interface IAxiosAbortConfig {
  url: string
  method?: 'get' | 'post' | 'patch' | 'delete'
  params?: object
}

interface IAxiosAbort {
  promise: Promise<AxiosResponse>
  abort: (reason?: any) => void
}

const baseAxios = axios.create({
  baseURL: 'https://db-rm.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const axiosAbort = (config: IAxiosAbortConfig): IAxiosAbort => {
  const { url, method = 'get', params = {} } = config
  const abortController = new AbortController()
  return {
    promise: baseAxios[method](url, { signal: abortController.signal, ...params }),
    abort: abortController.abort.bind(abortController)
  }
}

export const axiosRefresh = async (options = {}) => {
  let url = 'auth/refresh'
  try {
    const storedRefreshToken = await refreshTokenStore.getToken()
    if (storedRefreshToken !== null) url += `?refreshToken=${storedRefreshToken}`
  } catch (_) {}
  return axiosAbort({ url, params: options })
}

export const serverErrorResponseMessageOrGeneric = (e: unknown): string => {
  return isAxiosError(e) && e.response?.data?.message
    ? (e.response.data.message as string)
    : 'Something Went wrong 😥'
}

export default baseAxios
