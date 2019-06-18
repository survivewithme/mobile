import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import QuizStore, { Quiz } from '../stores/quiz'
import QuizButton from './QuizButton'
import QuizQuestionCell from './QuizQuestionCell'

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
      <View style={{ flex: 1 }}>
        <ScrollView
          onScroll={(e) => {
            const { contentOffset, contentOffset: { y } } = e.nativeEvent
            // Roughly calculate the percent down the screen
            const _percentComplete = 100 * y / height / (quiz.questions.length - 1)
            const percentComplete = Math.min(Math.abs(_percentComplete), 100)
            this.setState({ contentOffset, percentComplete })
          }}
          snapToInterval={height}
        >
          {quiz.questions.map((question) => (
            <QuizQuestionCell
              key={question._id}
              answerSelected={() => {
                // Scroll down

              }}
              question={question}
              style={{ minHeight: height }}
            />
          ))}
          <View style={{ minHeight: height }}>
            <Text>Evaluation complete</Text>
            <Button
              title="Save and exit"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
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
          <View
            style={{
              height: '100%',
              width: `${this.state.percentComplete}%`,
              backgroundColor: 'green',
            }}
          />
        </View>
      </View>
    )
  }
}

export default inject('auth', 'quiz')(observer(QuizComponent))
