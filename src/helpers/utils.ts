// import { Asset } from 'expo-asset'
import { Keyboard } from 'react-native'

export const hideKeyboard = () => {
  if (Keyboard.isVisible()) Keyboard.dismiss()
}

export const parseUriToFormObject = (uri: string) => {
  const fileName = uri.split('/').pop()

  if (fileName == null) return null

  const fileType = fileName.split('.').pop()

  const imageConfig = {
    uri,
    name: fileName,
    type: `image/${fileType}`
  }

  return imageConfig
}
