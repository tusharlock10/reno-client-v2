import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import Ripple from "react-native-material-ripple";
class Slots extends Component {
  render() {
    return (
      <View>
        <Ripple
          rippleDuration={300}
          style={{
            width: 55,
            height: 55,
            marginLeft: 15,
            marginTop: 20,
            marginRight: 4
          }}
          onPress={() =>
            this.props.navigation.navigate("CreateOrdersScreen", {
              discount: this.props.discount,
              time: this.props.time,
              timeDiscountId: this.props.timeDiscountId,
              id: this.props.id,
              timeDiscounts: this.props.timeDiscounts,
              imageUri: this.props.image,
              directions: this.props.directions,
              name: this.props.name,
              city: this.props.city
            })
          }
        >
          <View style={styles.twelvePointBurst}>
            <View style={[styles.twelvePointBurstMain]} />
            <View style={[styles.twelvePointBurst30]} />
            <View style={[styles.twelvePointBurst60]}>
              <View
                style={{
                  transform: [{ rotate: "-60deg" }],
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    marginTop:10,
                    fontFamily: "Poppins-Regular",
                    color: "#fff"
                  }}
                >
                  {this.props.time.slice(0, 5)}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    marginBottom:5,
                    fontFamily: "Poppins-SemiBold",
                    color: "#fff"
                  }}
                >
                  {this.props.discount}%
                </Text>
              </View>
            </View>
          </View>
        </Ripple>
      </View>
    );
  }
}
const styles = {
  twelvePointBurst: {},
  twelvePointBurstMain: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: "#d20000"
  },
  twelvePointBurst30: {
    width: 48,
    height: 48,
    borderRadius: 4,
    position: "absolute",
    backgroundColor: "#d20000",
    top: 0,
    left: 0,
    transform: [{ rotate: "30deg" }]
  },
  twelvePointBurst60: {
    width: 48,
    height: 48,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#d20000",
    top: 0,
    left: 0,
    transform: [{ rotate: "60deg" }]
  }
};

export default Slots;
