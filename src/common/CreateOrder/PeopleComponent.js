import React, { Component } from "react";
import { Text, View } from "react-native";
import Ripple from "react-native-material-ripple";

class Slots extends Component {
  render() {
    return (
      <Ripple
        onPress={this.props.onPress}
        rippleDuration={200}
        style={{
          width: "15%",
          height: 50,
          backgroundColor: this.props.isSelected ? "#d20000" : "#fff",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: this.props.isSelected ? "#d20000" : "#000",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 14,
            color: this.props.isSelected ? "#fff" : "#000"
          }}
        >
          {this.props.number}
        </Text>
      </Ripple>
    );
  }
}

class PeopleComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slot1: true,
      slot2: false,
      slot3: false,
      slot4: false,
      slot5: false,
      slot6: false
    };
  }

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
          How many people?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Slots
            number={1}
            isSelected={this.state.slot1}
            onPress={() => {
              this.props.callbackFromPeople(1);
              this.setState({
                slot1: true,
                slot2: false,
                slot3: false,
                slot4: false,
                slot5: false,
                slot6: false
              });
            }}
          />
          <Slots
            number={2}
            isSelected={this.state.slot2}
            onPress={() => {
              this.props.callbackFromPeople(2);
              this.setState({
                slot1: false,
                slot2: true,
                slot3: false,
                slot4: false,
                slot5: false,
                slot6: false
              });
            }}
          />
          <Slots
            number={3}
            isSelected={this.state.slot3}
            onPress={() => {
              this.props.callbackFromPeople(3);
              this.setState({
                slot1: false,
                slot2: false,
                slot3: true,
                slot4: false,
                slot5: false,
                slot6: false
              });
            }}
          />
          <Slots
            number={4}
            isSelected={this.state.slot4}
            onPress={() => {
              this.props.callbackFromPeople(4);
              this.setState({
                slot1: false,
                slot2: false,
                slot3: false,
                slot4: true,
                slot5: false,
                slot6: false
              });
            }}
          />
          <Slots
            number={5}
            isSelected={this.state.slot5}
            onPress={() => {
              this.props.callbackFromPeople(5);
              this.setState({
                slot1: false,
                slot2: false,
                slot3: false,
                slot4: false,
                slot5: true,
                slot6: false
              });
            }}
          />
          <Slots
            number={6}
            isSelected={this.state.slot6}
            onPress={() => {
              this.props.callbackFromPeople(6)
              this.setState({
                slot1: false,
                slot2: false,
                slot3: false,
                slot4: false,
                slot5: false,
                slot6: true
              });
            }}
          />
        </View>
      </View>
    );
  }
}
export default PeopleComponent;
