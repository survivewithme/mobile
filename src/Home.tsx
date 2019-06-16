import React from 'react'
import { View, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationScreenProps } from 'react-navigation'

class HomeScreen extends React.Component<{
  navigation: any
}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    title: 'Home',
  })
  render() {
    return (
      <Text>
        Home Screen
      </Text>
    )
  }
}

export default inject('auth')(observer(HomeScreen))
