import React from 'react'
import { Question } from '../stores/quiz'
import { View, Text } from 'react-native'
import QuizButton from './QuizButton'

export default class QuizQuestionCell extends React.Component<{
  question: Question
  style?: any
  answerSelected: () => void
  key?: string
}> {
  render() {
    return (
      <View
        key={this.props.key}
        style={this.props.style || {}}
      >
        <Text
          style={{
            margin: 8,
            fontSize: 18,
          }}
        >
          {this.props.question.text}
        </Text>
        {this.props.question.answers.map((answer) => (
          <QuizButton
            answerSelected={this.props.answerSelected}
            answer={answer}
          />
        ))}
      </View>
    )
  }
}
