import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Answer } from '../stores/quiz'

export default class QuizButton extends React.Component<{
  answer: Answer
  answerSelected: () => void
}> {
  render() {
    return (
      <TouchableOpacity
        key={this.props.answer._id}
        style={{
          backgroundColor: 'blue',
          borderRadius: 4,
          padding: 8,
          margin: 8,
        }}
      >
        <Text
          style={{ color: 'white' }}
        >
          {this.props.answer.text}
        </Text>
      </TouchableOpacity>
    )
  }
}
