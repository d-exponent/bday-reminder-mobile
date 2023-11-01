import { axiosAbort } from 'helpers/api/axios'
import { refreshTokenStore } from './tokenStorage'

const axiosRefresh = async (options = {}) => {
  let url = 'auth/refresh'
  try {
    const storedRefreshToken = await refreshTokenStore.getToken()
    if (storedRefreshToken !== null) url += `?refreshToken=${storedRefreshToken}`
  } catch (e) {
    /** */
  }
  return axiosAbort({ url, params: options })
}

export default axiosRefresh
