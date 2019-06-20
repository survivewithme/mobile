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
  dailyQuestion?: {
    quizId: string
    question: Question
  }
  dailyQuestionCompleted = true
  dailyAnswers: Answer[] = []

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

  async loadDailyQuestion() {
    try {
      const [ { data }, { data: { completed }}] = await Promise.all([
        axios.get('/questions/daily', {
          params: {
            token: auth.token,
          },
        }),
        axios.get('/questions/daily/completed', {
          params: {
            token: auth.token,
          },
        })
      ])
      this.dailyQuestion = data
      this.dailyQuestionCompleted = completed
    } catch (err) {
      console.log('Error loading daily question', err)
      throw err
    }
  }

  async loadDailyAnswers() {
    try {
      const { data } = await axios.get('/quizzes/daily/answers', {
        params: {
          token: auth.token,
        },
      })
      this.dailyAnswers = data
    } catch (err) {
      console.log('Error loading daily answers', err)
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
  dailyQuestion: observable,
  dailyQuestionCompleted: observable,
  dailyAnswers: observable,
})
