import { Lato_400Regular, useFonts as useLato } from '@expo-google-fonts/lato'
import { Oswald_400Regular, useFonts as useOswald } from '@expo-google-fonts/oswald'
import React from 'react'
import { ThemeProvider } from 'styled-components/native'

import { theme as appTheme } from 'infrastructure/theme'
import { type ReactChildrenProp } from '../../@types.birthday'

interface StyledComponentsThemeContextValue {
  toggleTheme: () => void
}

const StyledComponentsThemeContext =
  React.createContext<StyledComponentsThemeContextValue | null>(null)

const StyledComponentsThemeProvider = (props: ReactChildrenProp) => {
  const [isLightTheme, setIsLightTheme] = React.useState<boolean>(true)

  useOswald({ Oswald_400Regular })
  useLato({ Lato_400Regular })

  const theme = React.useMemo(() => {
    const { colors } = appTheme
    return {
      ...appTheme,
      colors: isLightTheme ? colors.lightTheme : colors.darkTheme
    }
  }, [isLightTheme])

  const value: StyledComponentsThemeContextValue = {
    toggleTheme: () => setIsLightTheme(prevTheme => !prevTheme)
  }

  return (
    <StyledComponentsThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StyledComponentsThemeContext.Provider>
  )
}

export default StyledComponentsThemeProvider
