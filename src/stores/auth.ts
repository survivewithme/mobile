import { decorate, observable } from 'mobx'
import axios from 'axios'
import * as Keychain from 'react-native-keychain'

interface Auth {
  _id: string
  token: string
}
export default class AuthStore {
  auth?: Auth

  get token() {
    if (!this.auth) throw new Error('Error accessing token')
    return this.auth.token
  }

  async loadAuth() {
    const storedData = await Keychain.getGenericPassword()
    if (!storedData) return
    this.auth = JSON.parse(storedData.password)
  }

  async login(options: { email: string, password: string }) {
    try {
      const { data } = await axios.post('/users/login', {
        ...options,
        token: this.token,
      })
      await Keychain.setGenericPassword(options.email, JSON.stringify(data))
      this.auth = data
    } catch (err) {
      console.log('Error logging in')
      throw err
    }
  }
}

decorate(AuthStore, {
  auth: observable,
})
