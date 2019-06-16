import React from 'react'
import { AppRegistry } from 'react-native'
import Navigator from './src'
import { Provider } from 'mobx-react'
import AuthStore from './src/stores/auth'
import { name } from './app.json'
import axios from 'axios'

axios.defaults.baseURL = 'https://backend.survivewithme.now.sh'
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.headers['content-type'] = 'application/json'

const stores = {
  auth: new AuthStore(),
}

const App = () => (
  <Provider {...stores}>
    <Navigator />
  </Provider>
)

AppRegistry.registerComponent(name, () => App)
