import { Lato_400Regular, useFonts as useLato } from '@expo-google-fonts/lato'
import { Oswald_400Regular, useFonts as useOswald } from '@expo-google-fonts/oswald'
import React from 'react'
import { ThemeProvider } from 'styled-components/native'

import { theme as appTheme } from 'infrastructure/theme'
import type {
  ColorTheme,
  FontSizes,
  FontWeights,
  Fonts,
  LineHeights,
  Sizes,
  Space
} from 'infrastructure/theme/types.theme'
import { type ReactChildrenProp } from '../../@types.birthday'

interface StyledComponentsThemeContextValue {
  toggleTheme: () => void
}

interface Theme {
  colors: ColorTheme
  space: Space
  lineHeights: LineHeights
  sizes: Sizes
  fonts: Fonts
  fontSizes: FontSizes
  fontWeights: FontWeights
}

const StyledComponentsThemeContext =
  React.createContext<StyledComponentsThemeContextValue | null>(null)

const StyledComponentsThemeProvider = (props: ReactChildrenProp) => {
  const [isLightTheme, setIsLightTheme] = React.useState<boolean>(true)

  useOswald({ Oswald_400Regular })
  useLato({ Lato_400Regular })

  const theme = React.useMemo<Theme>(() => {
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

export { StyledComponentsThemeProvider as default, type Theme }
