import React from 'react'
import { inject, observer } from 'mobx-react'

class DailyQuizScreen extends React.Component<{}> {
  render() {
    return (
      <>
      </>
    )
  }
}

export default inject('auth', 'quiz')(observer(DailyQuizScreen))
