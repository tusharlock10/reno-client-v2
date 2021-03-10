import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";

class OTPInputComponent extends Component {
  render() {
    return (
      <View
        style={{
          marginRight: 10,
          height: 60,
          width: 60,
          borderRadius: 6,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#e3e9ee",
          shadowColor: "#e3e9ee",
          justifyContent: "center",
          alignItems: "center",
          shadowOffset: { height: 8, width: 8 },
          shadowOpacity: 1,
          shadowRadius: 10
        }}
      >
        {this.props.children}
      </View>
    );
  }
}

class OTPInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      isVisible: false,
      inputotp: Math.floor(1000 + Math.random() * 9000)
    };
    this.props.otpCallback(
      `${this.state.digit1}${this.state.digit2}${this.state.digit3}${this.state.digit4}`
    );
  }
  clearText() {
    this.setState({
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: ""
    });
    this.digit1.focus();
  }

  changeI1() {
    if (this.state.digit1 == "") {
      this.digit2.focus();
    }
  }

  changeI2() {
    if (this.state.digit2 == "") {
      this.digit3.focus();
    }
  }

  changeI3() {
    if (this.state.digit3 == "") {
      this.digit4.focus();
    }
  }
  sendProps() {
    if (
      !this.state.digit1 == "" &&
      !this.state.digit2 == "" &&
      !this.state.digit3 == "" &&
      !this.state.digit4 == ""
    ) {
      console.log("show");
      this.props.callbackFromChild("show");
      this.props.otpCallback(
        `${this.state.digit1}${this.state.digit2}${this.state.digit3}${this.state.digit4}`
      );
    } else {
      console.log(
        this.state.digit1,
        this.state.digit2,
        this.state.digit3,
        this.state.digit4
      );
      this.props.callbackFromChild("dontShow");
      this.props.otpCallback(
        `${this.state.digit1}${this.state.digit2}${this.state.digit3}${this.state.digit4}`
      );
    }
  }
  render() {
    return (
      <View style={{ marginTop: 15, flexDirection: "row" }}>
        <OTPInputComponent>
          <TextInput
            ref={digit1 => {
              this.digit1 = digit1;
            }}
            selectionColor="#000"
            autoFocus
            value={this.props.value}
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 20,
              width: "100%",
              textAlign: "center"
            }}
            keyboardType="numeric"
            maxLength={1}
            value={this.state.digit1}
            onChange={() => this.changeI1()}
            onChangeText={async digit1 => {
              await this.setState({ digit1 });
              this.sendProps();
            }}
          />
        </OTPInputComponent>
        <OTPInputComponent>
          <TextInput
            ref={digit2 => {
              this.digit2 = digit2;
            }}
            selectionColor="#000"
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 20,
              width: "100%",
              textAlign: "center"
            }}
            keyboardType="numeric"
            maxLength={1}
            value={this.state.digit2}
            onChange={() => this.changeI2()}
            onChangeText={async digit2 => {
              await this.setState({ digit2 });
              this.sendProps();
            }}
          />
        </OTPInputComponent>
        <OTPInputComponent>
          <TextInput
            ref={digit3 => {
              this.digit3 = digit3;
            }}
            selectionColor="#000"
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 20,
              width: "100%",
              textAlign: "center"
            }}
            keyboardType="numeric"
            maxLength={1}
            value={this.state.digit3}
            onChange={() => this.changeI3()}
            onChangeText={async digit3 => {
              await this.setState({ digit3 });
              this.sendProps();
            }}
          />
        </OTPInputComponent>
        <OTPInputComponent>
          <TextInput
            ref={digit4 => {
              this.digit4 = digit4;
            }}
            selectionColor="#000"
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 20,
              alignSelf: "center",
              width: "100%",
              textAlign: "center"
            }}
            keyboardType="numeric"
            maxLength={1}
            value={this.state.digit4}
            onChangeText={async digit4 => {
              await this.setState({ digit4 });
              this.sendProps();
            }}
          />
        </OTPInputComponent>
      </View>
    );
  }
}
export default OTPInput;
