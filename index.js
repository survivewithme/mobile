import React from 'react'
import { AppRegistry } from 'react-native'
import Navigator from './src'
import { Provider } from 'mobx-react'
import auth from './src/stores/auth'
import QuizStore from './src/stores/quiz'
import { name } from './app.json'
import axios from 'axios'

axios.defaults.baseURL = 'https://backend.survivewithme.now.sh'
// axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.headers['content-type'] = 'application/json'

const stores = {
  auth,
  quiz: new QuizStore(),
}

const App = () => (
  <Provider {...stores}>
    <Navigator />
  </Provider>
)

AppRegistry.registerComponent(name, () => App)
