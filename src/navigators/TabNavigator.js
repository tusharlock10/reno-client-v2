import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {Platform, Dimensions, Image, View, Text} from 'react-native';
import PayIcon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Screens
import Home from '../components/Tabs/Home';
// import Home from './HomeNavigator';
import FindAndDine from '../components/Tabs/FindAndDine';
import RenoPay from '../components/Tabs/RenoPay';
import Reservations from './ReservationNavigator';
import FoodMasti from '../components/Tabs/FoodMasti';

const width = Dimensions.get('window').width;

const TabBarContainer = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      path: 'home',
      navigationOptions: {
        gesturesEnabled: false,
        title: 'Home',
        tabBarIcon: ({tintColor}) => (
          <AntDesign
            name="home"
            size={24}
            color={tintColor}
            style={{marginTop: 10}}
          />
        ),
      },
    },
    Nearby: {
      screen: FindAndDine,
      title: 'Nearby',
      path: 'nearby',
      navigationOptions: {
        gesturesEnabled: false,
        tabBarIcon: ({tintColor}) => (
          <SimpleLineIcon
            name="location-pin"
            color={tintColor}
            size={23}
            style={{marginTop: 10}}
          />
        ),
      },
    },
    RenoPay: {
      screen: RenoPay,
      navigationOptions: {
        gesturesEnabled: false,
        title: 'Reno Pay',
        tabBarIcon: ({tintColor}) => (
          <AntDesign
            name="scan1"
            color={tintColor}
            size={30}
            style={{marginTop: 10}}
          />
        ),
      },
    },
    Reservations: {
      screen: Reservations,
      navigationOptions: {
        gesturesEnabled: false,
        title: 'Reservation',
        tabBarIcon: ({tintColor}) => (
          <SimpleLineIcon
            name="notebook"
            color={tintColor}
            size={21}
            style={{marginTop: 10}}
          />
        ),
      },
    },
    FoodScreen: {
      screen: FoodMasti,
      navigationOptions: {
        title: 'Nukkad!',
        gesturesEnabled: false,
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name="food"
            color={tintColor}
            size={32}
            style={{marginTop: 10}}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
    tabBarOptions: {
      inactiveTintColor: '#A9A9A9',
      activeTintColor: '#d20000',
      labelStyle: {fontSize: 11, fontWeight: '500'},
      style: {
        width: width,
        height: 58,
        backgroundColor: 'white',
      },
    },
  },
);

export default TabBarContainer;
