import React from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'

class HomeScreen extends React.Component<{}> {
  render() {
    return (
      <View />
    )
  }
}

export default inject('auth')(observer(HomeScreen))
