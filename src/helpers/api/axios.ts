/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios, { isAxiosError, type AxiosResponse } from 'axios'

interface IAxiosAbortConfig {
  url: string
  method?: 'get' | 'post' | 'patch' | 'delete'
  params?: object
}

interface IAxiosAbort {
  promise: Promise<AxiosResponse>
  abort: () => void
}
const baseAxios = axios.create({
  baseURL: 'https://db-rm.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const axiosAbort = (config: IAxiosAbortConfig): IAxiosAbort => {
  const { url, method = 'get', params } = config
  const abortController = new AbortController()
  return {
    promise: baseAxios[method](url, { signal: abortController.signal, ...params }),
    abort: abortController.abort.bind(abortController)
  }
}

export const handleAxiosError = (e: unknown): string => {
  const genericMessage = 'Something went wrong.'
  if (isAxiosError(e)) {
    return e.response?.data?.message ?? genericMessage
  }
  return genericMessage
}

export default baseAxios
