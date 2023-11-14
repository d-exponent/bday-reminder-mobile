import React from 'react'
import { AuthContext, type IAuthValue } from '../context/AuthContext'

const useAuth = () => React.useContext(AuthContext) as IAuthValue

export default useAuth
