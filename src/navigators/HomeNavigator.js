import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import React from 'react';
import {Platform, Dimensions, Image, View, Text} from 'react-native';
import Home from '../components/Tabs/Home';
import Tabs from './TabNavigator';
import ChangeCity from '../components/Tabs/Home/ChangeCity';
import RightDrawer from '../common/RightDrawer';
import {width} from '../constants';

const TabNavigation = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        gesturesEnabled: false,
      },
      path: 'tabsHome',
    },
    ChangeCity: {
      screen: ChangeCity,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'Tabs',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  },
);

const HomeNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigation,
    },
  },
  {
    drawerPosition: 'right',
    contentComponent: RightDrawer,
    drawerWidth: width * 0.8,
    edgeWidth: -width,
  },
);
export default createAppContainer(HomeNavigator);
