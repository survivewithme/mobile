import React from 'react'
import { View, Text } from 'react-native'
import { Question, Answer } from '../stores/quiz'
import Colors from '../Colors'
import QuizButton from './QuizButton'

export default class HomeQuestionCell extends React.Component<{
  style?: any
  key?: string
  question: Question
  answerSelected: (answer: Answer) => any
}> {
  state = {
    debouncePromise: undefined,
    selectedAnswerId: undefined,
  }

  render() {
    return (
      <View
        key={this.props.key}
        style={{
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
          ...(this.props.style || {}),
        }}
      >
        <Text
          style={{
            margin: 8,
            fontSize: 15,
            color: Colors.black,
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
                this.state.selectedAnswerId === answer._id
                  ? Colors.green
                  : Colors.blue,
              margin: 4,
              padding: 4,
            }}
            answerSelected={async () => {
              if (this.state.debouncePromise) return
              this.setState({ selectedAnswerId: answer._id })
              const debouncePromise = new Promise((r) => setTimeout(r, 2500))
              this.setState({ debouncePromise })
              await Promise.all([
                Promise.resolve(this.props.answerSelected(answer)),
                debouncePromise,
              ])
              this.setState({ debouncePromise: undefined })
            }}
          />
        ))}
      </View>
    )
  }
}
