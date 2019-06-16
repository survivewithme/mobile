import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './Home'

export default createAppContainer(createStackNavigator({
  HomeScreen,
}, {
  initialRouteName: 'HomeScreen',
}))
