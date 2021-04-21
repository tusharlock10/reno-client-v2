import React, { Component } from "react";
import { Text, View } from "react-native";
import { width } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
class Header extends Component {
  render() {
    return (
      <View style={{ height: 55, width: width }}>
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
            onPress={() => this.props.navigation.goBack()}
            color="#000"
            size={28}
            style={{ marginLeft: 15 }}
          />
          <Text
            style={{
              marginLeft: 20,
              fontFamily: "Poppins-Medium",
              color: "#000",
              fontSize: 26
            }}
          >
            {this.props.name}
          </Text>
        </View>
      </View>
    );
  }
}
export default Header;
