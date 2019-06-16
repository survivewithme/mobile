import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationScreenProps } from 'react-navigation'
import AuthStore from './stores/auth'

class LoginScreen extends React.Component<{
  auth: AuthStore
}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    header: null,
  })

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ marginTop: 16, fontSize: 24 }}>
          Survive With Me
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder="email"
            style={{
              margin: 8,
              padding: 8,
              borderRadius: 4,
              borderWidth: 1,
              flex: 1,
            }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
          placeholder="password"
          secureTextEntry
          style={{
            margin: 8,
            padding: 8,
            borderRadius: 4,
            borderWidth: 1,
            flex: 1,
          }} />
        </View>
      </View>
    )
  }
}

export default inject('auth')(observer(LoginScreen))
