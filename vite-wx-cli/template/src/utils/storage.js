const storage = {
  save(key, value = '') {
    localStorage.setItem(key, value)
  },
  saveString(key, value = {}) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key, defaultValue = '') {
    return localStorage.getItem(key) || defaultValue
  },
  getString(key, defaultValue = {}) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}

export default storage
