import { type ReactNode } from 'react'

// PROP TYPES
export interface IReactChildren {
  children: ReactNode | ReactNode[]
}

// CONTEXTS TYPES
export interface IAuthValue {
  status: boolean | null
  setStatus: (status: boolean) => void
  logout: () => Promise<void>
}

export interface IThemeContextValue {
  toggleTheme: () => void
}

export interface IUserNotificationValue {
  showNotification: (msg: string) => void
}
