import LocalStorage from 'helpers/api/localStorage'
import settings from 'infrastructure/settings'

export interface HandleSaveTokensParams {
  refreshToken: string
  accessToken: string
}

/**
 * accessTokenStore and refreshTokenStore can share the same LocaStorage Instance since their keys never conflits
 * */
const STORE_INSTANCE = new LocalStorage()

class TokenStore {
  readonly key: string
  readonly store: LocalStorage

  constructor(key: string, Store?: new () => LocalStorage) {
    this.key = key
    this.store = Store === undefined ? STORE_INSTANCE : new Store()
  }

  public async save(value: string) {
    await this.store.setItem({ key: this.key, value })
  }

  public async getToken() {
    return await this.store.getItem(this.key)
  }

  public async removeToken() {
    await this.store.removeItem(this.key)
  }
}

export const refreshTokenStore = new TokenStore(settings.tokenStoreKeys.refresh)
export const accessTokenStore = new TokenStore(settings.tokenStoreKeys.access)

export const handleSaveTokens = async (params: HandleSaveTokensParams) => {
  const settled = await Promise.allSettled([
    refreshTokenStore.save(params.refreshToken),
    accessTokenStore.save(params.accessToken)
  ])

  // Authentication fails if refresh token doesn't save successfully
  if (settled[0].status === 'rejected') throw new Error('Save refresh token failed')
}
