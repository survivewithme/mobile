import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import HomeScreen from './Home'
import LoginScreen from './Login'
import OnboardingScreen from './Onboarding'
import AuthLoading from './AuthLoading'
import DailyQuizScreen from './DailyQuiz'

const AppStack = createStackNavigator({
  HomeScreen,
  DailyQuizScreen,
}, {
  initialRouteName: 'HomeScreen',
})

const AuthStack = createStackNavigator({
  LoginScreen,
  OnboardingScreen,
}, {
  initialRouteName: 'LoginScreen',
})

const _switch = createSwitchNavigator({
  App: AppStack,
  Auth: AuthStack,
  AuthLoading,
}, {
  initialRouteName: 'AuthLoading',
})

export default createAppContainer(_switch)
