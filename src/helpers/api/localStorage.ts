import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORE_KEYS } from 'infrastructure/constants'

interface ISetItemParams {
  key: string
  value: string
}

class LocalStorage {
  async setItem(params: ISetItemParams) {
    await AsyncStorage.setItem(params.key, params.value)
  }

  async getItem(key: string) {
    return await AsyncStorage.getItem(key)
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key)
  }

  static async removeAll() {
    await AsyncStorage.multiRemove(Object.values(STORE_KEYS))
  }
}

export default LocalStorage
