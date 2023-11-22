import axios, { isAxiosError, type AxiosResponse } from 'axios'
import settings from 'infrastructure/settings'
import { refreshTokenStore } from './tokenStorage'

interface AxiosWithAbortConfig {
  url: string
  method?: 'get' | 'post' | 'patch' | 'delete'
  params?: object
}

interface AxiosWithAbort {
  promise: Promise<AxiosResponse>
  abort: (reason?: any) => void
}

const baseAxios = axios.create({
  baseURL: settings.serverUrl,
  headers: {
    'Content-Type': 'application/json',
    platform: 'mobile'
  }
})

export const axiosWithAbort = (config: AxiosWithAbortConfig): AxiosWithAbort => {
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
    const token = await refreshTokenStore.getToken()
    if (token?.length != null) url += `?refreshToken=${token}`
  } catch (_) {}
  return axiosWithAbort({ url, params: options })
}

export const handleFetchErrorMessage = (
  error: unknown,
  alternateGenericMessage?: string
): string =>
  isAxiosError(error) && error.response?.data?.message !== undefined
    ? (error.response.data.message as string)
    : alternateGenericMessage ?? 'Something Went wrong 😥'

export const handleFetchSuccessMessage = (
  response: AxiosResponse,
  alternateGenericMessage?: string
) => response?.data?.message ?? alternateGenericMessage ?? 'Success ✔'

export default baseAxios
