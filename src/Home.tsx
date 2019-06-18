import React from 'react'
import { View, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationScreenProps, NavigationParams } from 'react-navigation'
import QuizStore from './stores/quiz'

class HomeScreen extends React.Component<{
  navigation: NavigationParams
  quiz: QuizStore
}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    title: 'Home',
  })

  state = {
    dailyQuizLoaded: false,
  }

  async componentDidMount() {
    await this.props.quiz.loadDailyQuiz()
    this.setState({ dailyQuizLoaded: true })
  }

  render() {
    return (
      <View style={{ margin: 8 }}>
        <Button
          title="Submit Daily Quiz"
          onPress={() => {
            console.log('test')
            this.props.navigation.navigate('DailyQuizScreen')
          }}
          disabled={!this.state.dailyQuizLoaded}
        />
      </View>
    )
  }
}

export default inject('auth', 'quiz')(observer(HomeScreen))
