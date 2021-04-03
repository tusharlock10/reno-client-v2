import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { width } from "../../constants";

class NameInput extends Component {
  render() {
    return (
      <View style={{ justifyContent: "center" }}>
        <Text
          style={{
            color: "#777777",
            fontFamily: "Poppins-Regular",
            fontSize: 14
          }}
        >
          Name
        </Text>
        <View
          style={{
            width: width * 0.45,
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: "#000"
          }}
        >
          <TextInput
            selectionColor="#000"
            placeholder="Enter name"
            style={{
              fontSize: 16,
              height: 40,
              paddingLeft: 10,
              fontFamily: "Poppins-Regular",
              paddingVertical:0,
            }}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
          />
        </View>
      </View>
    );
  }
}

class NumberInput extends Component {
  render() {
    return (
      <View>
        <Text
          style={{
            color: "#777777",
            fontFamily: "Poppins-Regular",
            fontSize: 14
          }}
        >
          Phone number
        </Text>
        <View
          style={{
            width: width * 0.45,
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 5,
            borderWidth: 0.5,
            justifyContent: "center",
            flexDirection: "row",
            borderColor: "#000"
          }}
        >
          <View
            style={{
              width: "25%",
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRightColor: "#777777",
              borderRightWidth: 0.5
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: "#777777",
                marginTop: 2,
                fontSize: 16
              }}
            >
              +91
            </Text>
          </View>
          <View
            style={{
              width: "75%",
              justifyContent: "center",
              height: 40,
              alignItems: "center"
            }}
          >
            <TextInput
              editable={true}
              selectionColor="#d20000"
              maxLength={10}
              keyboardType="phone-pad"
              placeholder="Phone number"
              style={{
                textAlignVertical: "center",
                fontSize: 16,
                height: "100%",
                width: "100%",
                paddingLeft: 10,
                fontFamily: "Poppins-Regular",
                paddingVertical:0,
              }}
              value={this.props.value}
              onChangeText={this.props.onChangeText}
            />
          </View>
        </View>
      </View>
    );
  }
}

class PersonalDetails extends Component {

  render() {
    return (
      <View style={{ margin: 10, marginTop: 15 }}>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            color: "#000000",
            fontSize: 17,
            marginLeft: 8,
            marginBottom: 5
          }}
        >
          Personal Details
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <NameInput
            value={this.props.name}
            onChangeText={name => {
              this.setState({ name });
              this.props.callbackAsName(name);
            }}
          />
          <NumberInput
            value={this.props.number}
            onChangeText={number => {
              this.setState({ number });
              this.props.callbackAsNumber(number);
            }}
          />
        </View>
      </View>
    );
  }
}
export default PersonalDetails;
