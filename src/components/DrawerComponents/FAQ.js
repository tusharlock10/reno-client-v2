import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import {width} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
class FAQScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            width,
            height: 55,
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Ionicons
            name="md-arrow-back"
            onPress={() => this.props.navigation.pop()}
            color="#000"
            size={28}
            style={{ marginLeft: 15 }}
          />
          <Text
            style={{
              marginLeft: 20,
              fontFamily: "Poppins-Medium",
              color: "#000",
              fontSize: 25
            }}
          >
            FAQs
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
export default FAQScreen;
