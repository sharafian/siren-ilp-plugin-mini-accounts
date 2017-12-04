class StoreWrapper {
  constructor (store) {
    this._store = store
    this._cache = new Map()
    this._write = Promise.resolve()
  }

  async load (key) {
    if (!this._store) return
    if (this._cache.get(key)) return
    this._cache.set(key, await this._store.get(key))
  }

  get (key) {
    return this._cache.get(key)
  }

  set (key, value, persist) {
    this._cache.set(key, value)
    if (persist) {
      this._write = this._write.then(() => {
        return this._store.put(key, value)
      })
    }
  }
}

module.exports = StoreWrapper
