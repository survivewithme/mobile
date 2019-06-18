import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { inject, observer } from 'mobx-react'
import QuizStore, { Quiz } from '../stores/quiz'

class QuizComponent extends React.Component<{
  _quiz?: QuizStore
  quiz?: Quiz
}> {
  state = {
    percentComplete: 0,
  }

  render() {
    const { height } = Dimensions.get('window')
    const { quiz } = this.props
    if (!quiz) return null
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
