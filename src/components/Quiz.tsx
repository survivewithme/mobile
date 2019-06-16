import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'

export default class QuizComponent extends React.Component<{}> {
  state = {
    percentComplete: 0,
  }
  quiz = {
    questions: [
      {
        text: 'How often have you felt nervous, anxious, or on edge in the past 2 weeks?',
        answers: [
          {
            text: 'Not at all',
            pointValue: 0,
          },
          {
            text: 'Several days',
            pointValue: 1,
          },
          {
            text: 'More than half the days',
            pointValue: 2,
          },
          {
            text: 'Nearly every day',
            pointValue: 3,
          },
        ]
      },
      {
        text: 'How often have you been unable to stop or control worrying in the past 2 weeks?',
        answers: [
          {
            text: 'Not at all',
            pointValue: 0,
          },
          {
            text: 'Several days',
            pointValue: 1,
          },
          {
            text: 'More than half the days',
            pointValue: 2,
          },
          {
            text: 'Nearly every day',
            pointValue: 3,
          },
        ]
      }
    ]
  }
  render() {
    const { height } = Dimensions.get('window')
    return (
      <View>
        <ScrollView
          onScroll={(e) => {
            const { y } = e.nativeEvent.contentOffset
            const _percentComplete = 100 * y / height / (this.quiz.questions.length - 1)
            const percentComplete = Math.min(Math.abs(_percentComplete), 100)
            this.setState({ percentComplete })
          }}
          snapToInterval={height}
        >
          {this.quiz.questions.map((question) => (
            <View key={question.text} style={{
              minHeight: height,
            }}>
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
