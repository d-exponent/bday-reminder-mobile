import React from 'react'
import {
  AuthenticationContext,
  type AuthenticationContextValue
} from '../context/AuthenticationProvider'

const useUserAuthentication = () =>
  React.useContext(AuthenticationContext) as AuthenticationContextValue

export default useUserAuthentication
