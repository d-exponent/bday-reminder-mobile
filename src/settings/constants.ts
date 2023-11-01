export const STORE_KEYS = {
  access: 'accessToken',
  refresh: 'refreshToken'
}

export const VALID_REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  accessCode: /^[0-9]{4,8}$/
}
