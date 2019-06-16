import React from 'react'
import { View, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationScreenProps } from 'react-navigation'
import Quiz from './components/Quiz'

class HomeScreen extends React.Component<{
  navigation: any
}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    title: 'Home',
  })
  render() {
    return (
      <View style={{ margin: 8 }}>
        <Quiz />
      </View>
    )
  }
}

export default inject('auth')(observer(HomeScreen))
