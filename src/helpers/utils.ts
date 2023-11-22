import { Keyboard } from 'react-native'

export const hideKeyboard = () => {
  if (Keyboard.isVisible()) Keyboard.dismiss()
}
