import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Button,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import QuizStore, { Quiz, Answer } from '../stores/quiz'
import QuizQuestionCell from './QuizQuestionCell'
import Colors from '../Colors'

class QuizComponent extends React.Component<{
  quiz?: QuizStore
  _quiz?: Quiz
  onComplete: () => void
}> {

  scrollViewRef = React.createRef<ScrollView>()
  state = {
    percentComplete: 0,
    yOffset: 0,
  }

  render() {
    const { height } = Dimensions.get('window')
    const { _quiz: quiz } = this.props
    if (!quiz) return null
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={this.scrollViewRef}
          onScroll={(e) => {
            const { contentOffset: { y } } = e.nativeEvent
            // Roughly calculate the percent down the screen
            const _percentComplete = 100 * y / height / (quiz.questions.length - 1)
            const percentComplete = Math.min(Math.abs(_percentComplete), 100)
            this.setState({ yOffset: y, percentComplete })
          }}
          snapToInterval={height}
        >
          {quiz.questions.map((question) => (
            <QuizQuestionCell
              key={question._id}
              answerSelected={async (answer: Answer) => {
                await this.props.quiz.submitQuizAnswer({
                  quizId: quiz._id,
                  questionId: question._id,
                  answerId: answer._id,
                })
                this.scrollViewRef.current.scrollTo({
                  y: this.state.yOffset + height,
                })
              }}
              question={question}
              style={{ minHeight: height }}
            />
          ))}
          <View style={{ minHeight: height }}>
            <Text style={{ fontSize: 20, padding: 8 }}>Evaluation Saved</Text>
            <Button
              title="Back"
              onPress={this.props.onComplete}
            />
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: Colors.blue,
            height: 4,
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${this.state.percentComplete}%`,
              backgroundColor: Colors.green,
            }}
          />
        </View>
      </View>
    )
  }
}

export default inject('auth', 'quiz')(observer(QuizComponent))
