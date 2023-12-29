export default {
  tokenStoreKeys: {
    access: 'accessToken',
    refresh: 'refreshToken'
  },
  validRegex: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    accessCode: /^[0-9]{4,8}$/
  },

  serverUrl: 'https://bdrm.eclipsedev.net/api/v1'
} as const
