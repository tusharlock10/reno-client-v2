import React, { Component } from "react";
import { Text, View } from "react-native";
import { width, height } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
class Header extends Component {
  render() {
    return (
      <View
        style={{
          height: 55,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { height: 3, width: 0 },
          shadowOpacity: 0.2,
          elevation: 3
        }}
      >
        <View
          style={{
            width,
            height: 55,
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Ionicons
            name="md-close"
            onPress={() => this.props.navigation.goBack()}
            color="#000"
            size={30}
            style={{ marginLeft: 15 }}
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 27,
              fontFamily: "Poppins-Medium",
              color: "#000"
            }}
          >
            Payment
          </Text>
        </View>
      </View>
    );
  }
}
export default Header;
