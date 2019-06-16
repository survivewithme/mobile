import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationScreenProps } from 'react-navigation'
import AuthStore from './stores/auth'

class LoginScreen extends React.Component<{
  auth: AuthStore
}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    header: null,
  })

  passwordRef = React.createRef<TextInput>()
  emailRef = React.createRef<TextInput>()

  state = {
    email: '',
    password: '',
  }

  componentDidMount() {
    if (this.emailRef.current)
      this.emailRef.current.focus()
  }

  onLoginPress = async () => {
    try {
      const { email, password } = this.state
      await this.props.auth.login({ email, password })
      this.props.navigation.navigate('AuthLoading')
    } catch (err) {
      alert('There was a problem logging in')
      this.setState({
        email: '',
        password: '',
      })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ marginTop: 16, fontSize: 24 }}>
          Survive With Me
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            ref={this.emailRef}
            autoCapitalize="none"
            placeholder="email"
            style={{
              margin: 8,
              padding: 8,
              borderRadius: 4,
              borderWidth: 1,
              flex: 1,
            }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            onSubmitEditing={() => this.passwordRef.current.focus()}
            returnKeyType="next"
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            ref={this.passwordRef}
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry
            style={{
              margin: 8,
              padding: 8,
              borderRadius: 4,
              borderWidth: 1,
              flex: 1,
            }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            onSubmitEditing={() => this.onLoginPress()}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={{
              padding: 8,
              margin: 8,
              backgroundColor: 'green',
              borderRadius: 4
            }}
          >
            <Text style={{ color: 'white'}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default inject('auth')(observer(LoginScreen))
