export interface IAuthSetEmailProp {
  setEmail: (email: string | null) => void
}

export interface IUserEmailProp {
  userEmail: string | null
}

export interface ISubmitAcccessCodeProps extends IUserEmailProp {
  exit: () => void
}

export interface IPressabelTextProps {
  text: string
  onPress: () => void
}
