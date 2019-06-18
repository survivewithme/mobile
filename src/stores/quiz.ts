import { decorate, observable } from 'mobx'
import axios from 'axios'
import auth from './auth'

interface Answer {
  _id: string
  text: string
  pointValue?: number
}

interface Question {
  _id: string
  text: string
  answers: Answer[]
}

interface Quiz {
  _id: string
  questions: Question[]
}

export default class QuizStore {
  @observable _byId: { [key: string]: Quiz } = {}
  quizzes: Quiz[] = []

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
}

decorate(QuizStore, {
  quizzes: observable,
})
