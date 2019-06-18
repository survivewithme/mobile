import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Answer } from '../stores/quiz'
import Colors from '../Colors'

export default class QuizButton extends React.Component<{
  answer: Answer
  answerSelected: () => void
  style?: any
}> {
  render() {
    return (
      <TouchableOpacity
        key={this.props.answer._id}
        style={{
          backgroundColor: Colors.blue,
          borderRadius: 4,
          padding: 8,
          margin: 8,
          transition: 'background-color 1s ease-in-out',
          ...(this.props.style || {}),
        }}
        onPress={this.props.answerSelected}
      >
        <Text
          style={{ color: Colors.white }}
        >
          {this.props.answer.text}
        </Text>
      </TouchableOpacity>
    )
  }
}
