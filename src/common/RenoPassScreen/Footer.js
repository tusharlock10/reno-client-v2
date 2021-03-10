import React, { Component } from "react";
import { Text, View } from "react-native";
import { width } from "../../constants";
import Ripple from "react-native-material-ripple";
class Footer extends Component {
  
  
  render() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#000",
          shadowColor: "#00000029",
          shadowOpacity: 1,
          shadowOffset: { height: -3, width: 0 },
          height: 75 + 25,
          alignItems: "center",
          justifyContent: "flex-start",
          width: width
        }}
      >
        <Ripple
          onPress={() =>
            this.props.navigation.navigate("PaymentGateway", {
              days: this.props.time
            })
          }
          style={{
            width: "90%",
            height: 55,
            marginTop: 10,
            backgroundColor: "#d20000",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 17,
              color: "#fff"
            }}
          >
            Buy Membership
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 14,
              color: "#fff"
            }}
          >
            For {this.props.time} @ ₹{this.props.price}
          </Text>
        </Ripple>
      </View>
    );
  }
}
export default Footer;
