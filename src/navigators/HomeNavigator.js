import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import React from "react";
import { Platform, Dimensions, Image, View, Text } from "react-native";
import Home from "../components/Tabs/Home";
import Tabs from "./TabNavigator";
import { fromLeft } from "react-navigation-transitions";
import ChangeCity from "../components/Tabs/Home/ChangeCity";
import RightDrawer from "../common/RightDrawer";
import { width } from "../constants";

const TabNavigation = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        gesturesEnabled: false
      },
      path:"tabsHome"
    },
    ChangeCity: {
      screen: ChangeCity,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    initialRouteName: "Tabs",
    headerMode: "none",
    transitionConfig: () => fromLeft(500),
    cardStyle: {
      backgroundColor: "#fff"
    }
  }
);

const HomeNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigation
    }
  },
  {
    drawerPosition: "right",
    contentComponent: RightDrawer,
    drawerWidth:width*0.8,
    edgeWidth:-width
  }
);
export default createAppContainer(HomeNavigator);
