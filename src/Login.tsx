import React from 'react'
import { View, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationScreenProps } from 'react-navigation'

class LoginScreen extends React.Component<{}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    header: null,
  })

  render() {
    return (
      <Text>
        Login
      </Text>
    )
  }
}

export default inject('auth')(observer(LoginScreen))
