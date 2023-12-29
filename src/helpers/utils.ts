// import { Asset } from 'expo-asset'
import { Keyboard } from 'react-native'

export const hideKeyboard = () => {
  if (Keyboard.isVisible()) Keyboard.dismiss()
}

// export const getAsset = (file: string) => {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   return Asset.fromModule(require('../../assets/' + file)).uri
// }
