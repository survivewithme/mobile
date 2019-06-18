import React from 'react'
import { inject, observer } from 'mobx-react'
import Quiz from './components/Quiz'
import { NavigationScreenProps } from 'react-navigation'
import QuizStore from './stores/quiz'

class DailyQuizScreen extends React.Component<{
  quiz: QuizStore
}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    header: null,
  })

  state = {
    quizId: undefined,
  }

  // Daily quiz loading delegated to Home screen
  // async componentDidMount() {
  //   await this.props.quiz.loadDailyQuiz()
  // }

  render() {
    return (
      <Quiz quiz={this.props.quiz.dailyQuiz} />
    )
  }
}

export default inject('auth', 'quiz')(observer(DailyQuizScreen))
