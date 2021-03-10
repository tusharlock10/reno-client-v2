import React, { Component } from "react";
import { Text, View } from "react-native";
import CustomAMRTab from "../../CustomAMRTab";
import { height, width } from "../../../constants";
import AboutView from './AboutView';
import MenuView from './MenuView';
import ReviewView from './ReviewView';
class App extends Component {
  render() {
    return (
      <View style={{ height: height * 0.3, width: width,}}>
        <CustomAMRTab 
          aboutTab={<AboutView/>}
          menuTab={<MenuView/>}
          reviewTab= {<ReviewView/>}
        />
      </View>
    );
  }
}
export default App;
