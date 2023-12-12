import { type Theme } from 'context/StyledComponentsThemeContext'
import { type ReactNode } from 'react'

// PROP TYPES
export interface ReactChildrenProp {
  children: ReactNode | ReactNode[]
}

export interface IUser {
  name: string
  email: string
  phone: string
  id: string
  role: string
}

export interface StyledWithThemeProp {
  theme: Theme
}
