import * as SecureStore from 'expo-secure-store'

interface SetItemsParams {
  key: string
  value: string
}
class LocalStorage {
  public async setItem(params: SetItemsParams) {
    await SecureStore.setItemAsync(params.key, params.value)
  }

  public async getItem(key: string) {
    return await SecureStore.getItemAsync(key)
  }

  public async removeItem(key: string) {
    await SecureStore.deleteItemAsync(key)
  }
}

export default LocalStorage
