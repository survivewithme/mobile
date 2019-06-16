import React from 'react'
import { View, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import AuthStore from './stores/auth'

class OnboardingScreen extends React.Component<{
  auth: AuthStore
}> {
  render() {
    return (
      <Text>
        Loading auth...
      </Text>
    )
  }
}

export default inject('auth')(observer(OnboardingScreen))
