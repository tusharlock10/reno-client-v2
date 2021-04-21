import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../components/LoginScreen';

import ReservationHome from '../components/Tabs/Reservations';

const ReservationNavigator = createStackNavigator(
  {
    ReservationHome: {
      screen: ReservationHome,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'ReservationHome',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
    navigationOptions: ({navigation}) => {
      let tabBarVisible = true;
      let routes = navigation.state.index;
      if (routes > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible,
      };
    },
  },
);

export default ReservationNavigator;
