import { useContext } from 'react'
import LoginEmailContext, {
  type ILoginEmailContext
} from '../context/loginEmailContext'

const useLoginEmail = () => useContext(LoginEmailContext) as ILoginEmailContext

export default useLoginEmail
