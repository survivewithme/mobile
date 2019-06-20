import React from 'react'
import { View, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationScreenProps, NavigationParams } from 'react-navigation'
import QuizStore, { Answer } from './stores/quiz'
import HomeQuestionCell from './components/HomeQuestionCell'

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
    await Promise.all([
      this.props.quiz.loadDailyQuiz(),
      this.props.quiz.loadDailyQuestion(),
      this.props.quiz.loadDailyAnswers(),
    ])
    this.setState({ dailyQuizLoaded: true })
  }

  onDailyQuestionAnswer = async (answer: Answer) => {
    const { dailyQuestion } = this.props.quiz
    if (!dailyQuestion) return
    await this.props.quiz.submitQuizAnswer({
      quizId: dailyQuestion.quizId,
      questionId: dailyQuestion.question._id,
      answerId: answer._id,
    })
    await this.props.quiz.loadDailyQuestion()
  }

  render() {
    const { dailyQuestion, dailyQuestionCompleted } = this.props.quiz
    console.log(this.props.quiz.dailyAnswers)
    return (
      <View style={{ margin: 8, alignItems: 'center' }}>
        {dailyQuestion && !dailyQuestionCompleted ? (
          <HomeQuestionCell
            question={dailyQuestion.question}
            answerSelected={this.onDailyQuestionAnswer}
          />
        ) : (
          <Text>All caught up 🌈</Text>
        )}
        {this.props.quiz.dailyAnswers.map((answer) => (
          <View key={answer._id} style={{ backgroundColor: 'red' }}>
            <Text>{answer.answer.text}</Text>
          </View>
        ))}
      </View>
    )
  }
}

export default inject('auth', 'quiz')(observer(HomeScreen))
