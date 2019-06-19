import { decorate, observable } from 'mobx'
import axios from 'axios'
import auth from './auth'

export interface Answer {
  _id: string
  text: string
  pointValue?: number
}

export interface Question {
  _id: string
  text: string
  answers: Answer[]
}

export interface Quiz {
  _id: string
  questions: Question[]
}

export default class QuizStore {
  @observable _byId: { [key: string]: Quiz } = {}
  quizzes: Quiz[] = []
  dailyQuiz?: Quiz

  async loadQuizzes() {
    try {
      const { data } = await axios.get('/quizzes', {
        params: {
          token: auth.token,
        },
      })
      this.quizzes = data
    } catch (err) {
      console.log('Error loading quizzes', err)
      throw err
    }
  }

  async loadDailyQuiz() {
    try {
      const { data } = await axios.get('/quizzes/daily', {
        params: {
          token: auth.token,
        },
      })
      this.dailyQuiz = data
    } catch (err) {
      console.log('Error loading daily quiz', err)
      throw err
    }
  }

  async submitQuizAnswer(answer: {
    quizId: string
    answerId: string
    questionId: string
  }) {
    try {
      await axios.post('/quizzes/answer', {
        ...answer,
        token: auth.token,
      })
    } catch (err) {
      console.log('Error submiting quiz answer', err)
      throw err
    }
  }
}

decorate(QuizStore, {
  quizzes: observable,
  dailyQuiz: observable,
})
