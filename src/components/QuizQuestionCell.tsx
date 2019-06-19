import React from 'react'
import { Question, Answer } from '../stores/quiz'
import { View, Text } from 'react-native'
import QuizButton from './QuizButton'
import Colors from '../Colors'

export default class QuizQuestionCell extends React.Component<{
  question: Question
  style?: any
  answerSelected: (answer: Answer) => void
  key?: string
}> {
  state = {
    selectedAnswerId: undefined,
  }

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
            key={answer._id}
            answer={answer}
            style={{
              backgroundColor:
                answer._id === this.state.selectedAnswerId ? Colors.green : Colors.blue,
            }}
            answerSelected={() => {
              this.setState({ selectedAnswerId: answer._id })
              this.props.answerSelected(answer)
            }}
          />
        ))}
      </View>
    )
  }
}
