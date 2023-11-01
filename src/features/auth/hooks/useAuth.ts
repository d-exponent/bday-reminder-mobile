import { useContext } from 'react'
import { AuthContext, type IAuthContext } from '../context/authContext'

const useAuth = () => useContext(AuthContext) as IAuthContext

export default useAuth
