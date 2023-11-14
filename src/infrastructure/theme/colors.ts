// To aid in development, both light and dark themes will point to the same theme
const theme = {
  brand: {
    primary: '#2182BD',
    secondary: '#5282BD',
    muted: '#C6DAF7'
  },
  ui: {
    primary: '#262626',
    secondary: '#757575',
    tertiary: '#F1F1F1',
    quaternary: '#FFFFFF',
    disabled: '#DEDEDE',
    error: '#D0421B',
    success: '#138000'
  },
  bg: {
    primary: '#FFFFFF',
    secondary: '#F1F1F1'
  },
  text: {
    primary: '#262626',
    secondary: '#757575',
    disabled: '#9C9C9C',
    inverse: '#FFFFFF',
    error: '#D0421B',
    success: '#138000'
  }
}

// A dark theme hasn't been designed for the app yet. For now we will default to the same theme for both.
export const colors = { lightTheme: theme, darkTheme: theme }
