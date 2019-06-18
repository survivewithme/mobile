import React from 'react'
import { View, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { AuthStore } from './stores/auth'

class OnboardingScreen extends React.Component<{
  auth: AuthStore
  navigation: any
}> {
  async componentDidMount() {
    // If already loaded redirect and abort load
    if (this.props.auth.auth) {
      this.props.navigation.navigate('App')
      return
    }
    await this.props.auth.loadAuth()
    if (this.props.auth.auth) {
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('LoginScreen')
    }
  }

  render() {
    return (
      <Text>
        Loading auth...
      </Text>
    )
  }
}

export default inject('auth')(observer(OnboardingScreen))
