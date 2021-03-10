import React, { Component } from "react";
import { Text, View, Image, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { width, height } from "../../constants";
import OTPInput from "./OTPInput";
import Footer from "./Footer";
import axios from "../../api";
import { Snackbar } from "react-native-paper";
class OTPScreen extends Component {
  async componentDidMount() {
    await axios.post("/bookingOtp", {
      mobile: this.props.navigation.state.params.phoneno,
      restaurantId: this.props.navigation.state.params.restaurantId
    });
  }
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      otp: "",
      active: false
    };
  }

  render() {
    console.log(this.state);
    return (
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <Header navigation={this.props.navigation} />
        <Image
          source={require("../../../assets/otpAsset.png")}
          style={{ height: height / 4, width, alignSelf: "center" }}
          resizeMode="contain"
        />
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 22,
              color: "#000"
            }}
          >
            OTP Verification
          </Text>
          <Text
            style={{
              paddingTop: 10,
              fontFamily: "Poppins-SemiBold",
              fontSize: 19,
              color: "#797f87"
            }}
          >
            Enter OTP send to
            <Text style={{ fontFamily: "Poppins-Bold", color: "#767d86" }}>
              {" "}
              +91 {this.props.navigation.state.params.phoneno}
            </Text>
          </Text>
          <OTPInput
            otpCallback={otp => this.setState({ otp })}
            callbackFromChild={visible => {
              if (visible == "show") {
                this.setState({ visible: true });
              } else {
                this.setState({ visible: false });
              }
            }}
          />

          <Footer
            people={this.props.navigation.state.params.people}
            timeDiscountId={this.props.navigation.state.params.timeDiscountId}
            restaurantId={this.props.navigation.state.params.restaurantId}
            date={this.props.navigation.state.params.date}
            name={this.props.navigation.state.params.name}
            mobile={this.props.navigation.state.params.phoneno}
            otp={this.state.otp}
            navigation={this.props.navigation}
            active={this.state.visible}
            showSnackbar={state => this.setState({ active: state })}
          />
          <Snackbar
            visible={this.state.active}
            theme={{ colors: { accent: "white" } }}
            style={{
              position: "absolute",
              bottom: 0,
              elevation: 17,
              backgroundColor: "#d20000",
              height: 55,
              width: "90%",
              alignSelf: "center",
              borderRadius: 5
            }}
            onDismiss={() => this.setState({ active: false })}
            action={{
              label: "Okay",
              onPress: () => {
                null;
              }
            }}
          >
            <Text
              style={{
                marginLeft: 10,
                fontFamily: "Poppins-Medium",
                color: "#fff"
              }}
            >
              Incorrect OTP
            </Text>
          </Snackbar>
        </View>
      </SafeAreaView>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <View style={{ width, height: 55, justifyContent: "center" }}>
        <Ionicons
          name="md-arrow-back"
          onPress={() => this.props.navigation.pop()}
          color="#000"
          size={35}
          style={{ marginLeft: 15 }}
        />
      </View>
    );
  }
}

export default OTPScreen;
