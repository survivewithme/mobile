import React from 'react'
import { View, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationScreenProps, NavigationParams } from 'react-navigation'
import Quiz from './components/Quiz'

class HomeScreen extends React.Component<{
  navigation: NavigationParams
}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    title: 'Home',
  })

  render() {
    return (
      <View style={{ margin: 8 }}>
        <Button title="Submit Daily Quiz" onPress={() => {
          console.log('test')
          this.props.navigation.navigate('DailyQuizScreen')
        }} />
      </View>
    )
  }
}

export default inject('auth')(observer(HomeScreen))
