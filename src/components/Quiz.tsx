import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { inject, observer } from 'mobx-react'
import QuizStore from '../stores/quiz'

class QuizComponent extends React.Component<{
  quiz: QuizStore
}> {
  state = {
    percentComplete: 0,
  }

  async componentDidMount() {
    await this.props.quiz.loadQuizzes()
  }

  render() {
    const { height } = Dimensions.get('window')
    if (!this.props.quiz.quizzes.length) {
      return null
    }
    const [ quiz ] = this.props.quiz.quizzes
    return (
      <View>
        <ScrollView
          onScroll={(e) => {
            const { y } = e.nativeEvent.contentOffset
            const _percentComplete = 100 * y / height / (quiz.questions.length - 1)
            const percentComplete = Math.min(Math.abs(_percentComplete), 100)
            this.setState({ percentComplete })
          }}
          snapToInterval={height}
        >
          {quiz.questions.map((question) => (
            <View
              key={question.text}
              style={{
                minHeight: height,
              }}
            >
              <Text style={{ margin: 8, fontSize: 18 }}>{question.text}</Text>
              {question.answers.map((answer) => (
                <TouchableOpacity
                  key={answer.text}
                  style={{
                    backgroundColor: 'blue',
                    borderRadius: 4,
                    padding: 8,
                    margin: 8,
                  }}
                >
                  <Text style={{ color: 'white' }}>{answer.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#000',
            height: 20
          }}
        >
        <View style={{
          height: '100%',
          width: `${this.state.percentComplete}%`,
          backgroundColor: 'green',
        }} />
        </View>
      </View>
    )
  }
}

export default inject('auth', 'quiz')(observer(QuizComponent))
