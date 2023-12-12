// sizes
export type Sizes = string[]

// Spaceing
export interface LineHeights {
  title: string
  copy: string
}

export type Space = string[]

// colors
interface Brand {
  primary: string
  secondary: string
  muted: string
}

interface Ui {
  primary: string
  secondary: string
  tertiary: string
  quaternary: string
  disabled: string
  error: string
  success: string
}

interface Bg {
  primary: string
  secondary: string
}
interface Text {
  primary: string
  secondary: string
  disabled: string
  inverse: string
  error: string
  success: string
}

export interface ColorTheme {
  brand: Brand
  ui: Ui
  bg: Bg
  text: Text
}

export interface Colors {
  lightTheme: ColorTheme
  darkTheme: ColorTheme
}

// fonts
export interface Fonts {
  body: string
  heading: string
  monospace: string
}
export interface FontSizes {
  formWarn: string
  caption: string
  button: string
  body: string
  title: string
  h5: string
  h4: string
  h3: string
  h2: string
  h1: string
}

export interface FontWeights {
  regular: number
  medium: number
  bold: number
}
