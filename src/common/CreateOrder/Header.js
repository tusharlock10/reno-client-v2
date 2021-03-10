import React, { Component } from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { height, width } from "../../constants";
class Header extends Component {
  render() {
    return (
      <View
        style={{
          // position: "absolute",
          width: width,
          height:50,
          shadowColor: "#000",
          shadowOffset: { height: 5, width: 0 },
          shadowOpacity: 0.2,
          backgroundColor: "#fff",
          elevation:8,
          // backgroundColor: "rgba(115, 110, 110,0.1)",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            height: 50,
            // justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: width
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 0.7,
              alignItems: "center",
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
                fontSize: 19,
                fontFamily: "Poppins-Medium",
                color: "#000"
              }}
            >
              {this.props.name}
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,
              alignItems: "flex-end",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                alignSelf: "center",
                marginRight: 5,
                borderRadius: 5,
                backgroundColor: "#299e49"
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  margin: 5,
                  color: "#fff"
                }}
              >
                Reno Pay
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Header;
