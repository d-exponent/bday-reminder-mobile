import React from 'react'
import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald'
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato'
import { ThemeProvider } from 'styled-components/native'

import { type IThemeContextValue, type IReactChildren } from '../../@types.birthday'

import { theme } from 'infrastructure/theme'

const ThemeContext = React.createContext<IThemeContextValue | null>(null)

const ThemeContextProvider = (props: IReactChildren) => {
  // TODO: Save theme configuration in file system
  const [isLightTheme, setIsLightTheme] = React.useState<boolean>(true)

  // Load google themes
  useOswald({ Oswald_400Regular })
  useLato({ Lato_400Regular })

  const themeConfig = React.useMemo(() => {
    const { colors } = theme
    return {
      ...theme,
      colors: isLightTheme ? colors.lightTheme : colors.darkTheme
    }
  }, [isLightTheme])

  const contextValue: IThemeContextValue = {
    toggleTheme: () => setIsLightTheme(prevTheme => !prevTheme)
  }

  return (
    <ThemeProvider theme={themeConfig}>
      <ThemeContext.Provider value={contextValue}>
        <>{props.children}</>
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

export { ThemeContextProvider as default, ThemeContext }
