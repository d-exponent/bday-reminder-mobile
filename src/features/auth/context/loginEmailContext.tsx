import React, { createContext, useState } from 'react'
import { type IReactChildren } from '../../../../@types.birthday'

interface ILoginEmailContext {
  email: string
  setEmail: (email: string) => void
}

const LoginEmailContext = createContext<ILoginEmailContext | null>(null)

const LoginEmailProvider = (props: IReactChildren) => {
  const [userEmail, setUserEmail] = useState<string>('')

  const contextValue: ILoginEmailContext = {
    email: userEmail,
    setEmail: (email: string) => setUserEmail(email)
  }

  return (
    <LoginEmailContext.Provider value={contextValue}>
      <>{props.children}</>
    </LoginEmailContext.Provider>
  )
}

export { LoginEmailProvider, LoginEmailContext as default, type ILoginEmailContext }
