import React from 'react'
import { View, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationScreenProps, NavigationParams } from 'react-navigation'
import QuizStore, { Answer } from './stores/quiz'
import HomeQuestionCell from './components/HomeQuestionCell'
import { LineChart } from 'react-native-chart-kit'
import Colors from './Colors'
import moment from 'moment'

class HomeScreen extends React.Component<{
  navigation: NavigationParams
  quiz: QuizStore
}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    title: 'Home',
  })

  async componentDidMount() {
    await Promise.all([
      this.props.quiz.loadDailyQuiz(),
      this.props.quiz.loadDailyQuestion(),
      this.props.quiz.loadDailyAnswers(),
    ])
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
    const {
      dailyAnswers,
      dailyQuestion,
      dailyQuestionCompleted,
    } = this.props.quiz
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
        {dailyAnswers.length ? (
          <View
            style={{
              margin: 8,
              borderRadius: 4,
              padding: 4,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowColor: Colors.black,
              shadowOpacity: 0.2,
              shadowRadius: 4,
              backgroundColor: Colors.white,
              elevation: 1,
            }}
          >
            <LineChart
              data={{
                labels: [
                  dailyAnswers.map((answer, index) => {
                    const day = +moment(answer.createdAt).format('DD')
                    let format = 'DD'
                    if (day % 10 === 0 || index === 0) {
                      format = 'MMM DD'
                    }
                    return moment(answer.createdAt).format(format)
                  }),
                ],
                datasets: [
                  {
                    data: dailyAnswers.map((answer) =>
                      Number(answer.answer.pointValue || 0)
                    ),
                  },
                ],
              }}
              chartConfig={{
                backgroundColor: Colors.white,
                backgroundGradientFrom: Colors.white,
                backgroundGradientTo: Colors.white,
                color: (alpha = 1) => `rgba(20, 20, 20, ${alpha})`,
                strokeWidth: 2,
              }}
              fromZero
              width={300}
              height={200}
              bezier
            />
          </View>
        ) : null}
      </View>
    )
  }
}

export default inject('auth', 'quiz')(observer(HomeScreen))
