import LocalStorage from 'helpers/api/localStorage'
import { STORE_KEYS } from '../../infrastructure/constants'

class TokenStore {
  readonly key: string
  readonly store: LocalStorage

  constructor(key: string, Storage: new () => LocalStorage = LocalStorage) {
    this.key = key
    this.store = new Storage()
  }

  async save(value: string) {
    await this.store.setItem({ key: this.key, value })
  }

  async getToken() {
    return await this.store.getItem(this.key)
  }
}

export const refreshTokenStore = new TokenStore(STORE_KEYS.refresh)
export const accessTokenStore = new TokenStore(STORE_KEYS.access)
