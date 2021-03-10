import React, { Component } from "react";
import { Text, View } from "react-native";
import { width, height } from "../../constants";
import Icon from "react-native-vector-icons/Entypo";
import Ripple from "react-native-material-ripple";

class CheckBox extends Component {
  render() {
    return (
      <Ripple
        rippleDuration={200}
        onPress={this.props.onPress}
        style={{
          height: 27,
          width: 27,
          borderColor: "#d20000",
          borderRadius: 5,
          borderWidth: 0.5,
          backgroundColor: this.props.checked ? "#d20000" : "#fff",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.props.checked ? (
          <Icon name="check" size={18} color="#fff" />
        ) : (
          <View />
        )}
      </Ripple>
    );
  }
}

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  render() {
    return (
      <View style={{ marginBottom: 140 }}>
        <View
          style={{
            width: width * 0.5,
            height: 43,
            borderRadius: 43 / 2,
            borderWidth: 0.2,
            borderColor: "#707070",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#00000029",
            elevation:5,
            shadowOpacity: 1,
            backgroundColor: "#fff",
            shadowOffset: { height: 3, width: 3 },
            shadowRadius: 7
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 14,
              color: "#d20000"
            }}
          >
            Terms & Conditions
          </Text>
        </View>
        <Text
          style={{
            color: "#000",
            fontFamily: "Poppins-Regular",
            fontSize: 14,
            marginLeft: 15,
            marginTop: 15
          }}
        >
          Above discounts applicable on complete menu and bill.{"\n"}Table
          reservations are held for maximum 30 minutes from the reservation
          time.{"\n"}All orders are placed within the time slot plus extra half
          hour will be covered in discount.{"\n"}Late orders will not be
          covered.{"\n"}Late arrivals may result to cancellation of booking.
          {"\n"}All guests expected to be present during specific reservation
          time-slots.
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 15,
            marginTop: 15,
            width: width*0.95,
            marginRight: 10,
            alignItems: "center"
          }}
        >
          <CheckBox
            onPress={() => {
              this.setState({ checked: !this.state.checked });
              this.props.callbackFromChild(this.state.checked);
            }}
            checked={this.state.checked}
          />
          <Text
            onPress={() => {
              this.setState({ checked: !this.state.checked });
              this.props.callbackFromChild(!this.state.checked);
            }}
            numberOfLines={2}
            style={{
              marginLeft: 10,
              fontFamily: "Poppins-Regular",
              fontSize: 13,
              marginRight: 15
            }}
          >
            I have read and accept all the terms and conditions
          </Text>
        </View>
      </View>
    );
  }
}
export default TermsAndConditions;
