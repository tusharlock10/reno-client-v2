import React, { Component } from "react";
import { Text, View, SafeAreaView, Image, ImageBackground } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { height, width } from "../../../constants";
import Ripple from "react-native-material-ripple";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
class BookingConfirmation extends Component {
  componentDidMount() {
    console.log(this.props.navigation);
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{ height: height * 0.4, width, backgroundColor: "#E9E9E9" }}
        >
          <ImageBackground
            source={require("../../../../assets/confirm.gif")}
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
            resizeMode="cover"
          >
            <Ionicons
              name="md-arrow-back"
              onPress={() => this.props.navigation.popToTop()}
              color="#000"
              size={28}
              style={{ marginLeft: 15, position: "absolute", top: 20,left:10 }}
            />
            <View
              style={{
                width,
                marginTop: "10%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.6)",
                opacity: 1
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  color: "#239A00",
                  fontSize: 18
                }}
              >
                Booking Confirmed
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            position: "absolute",
            height: height * 0.5,
            top: height * 0.38,
            width: width * 0.91,
            borderRadius: 10,
            alignSelf: "center",
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { height: 4, width: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8
          }}
        >
          <Text
            style={{
              marginTop: 10,
              alignSelf: "center",
              fontFamily: "Poppins-Regular",
              fontSize: 18,
              marginBottom: 10,
              color: "#d20000"
            }}
          >
            Thank you for Reservation!
          </Text>
          <View
            style={{
              flexDirection: "row",
              margin: 15,
              justifyContent: "space-around"
            }}
          >
            <Image
              source={{
                uri: "https://media.timeout.com/images/105239239/image.jpg"
              }}
              style={{ height: 120, width: 150, borderRadius: 8 }}
            />
            <View style={{ justifyContent: "space-between" }}>
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 20,
                  color: "#000"
                }}
              >
                House of malts
              </Text>
              <Ripple
                rippleColor="#d20000"
                style={{
                  height: 45,
                  borderRadius: 5,
                  margin: 10,
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#d20000",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Foundation name="telephone" size={18} color="#d20000" />
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    marginLeft: 6,
                    color: "#d20000"
                  }}
                >
                  Contact
                </Text>
              </Ripple>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              borderWidth: 0.5,
              borderColor: "grey",
              marginTop: 15
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                alignItems: "center"
              }}
            >
              <FontAwesome5 name="user" color="#000" size={18} />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Poppins-Regular",
                  fontSize: 16
                }}
              >
                Vijay Verma
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                color: "#d20000",
                fontSize: 16,
                marginRight: 10
              }}
            >
              Directions
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <View
              style={{
                width: "29%",
                backgroundColor: "#E9E9E9",
                height: 80,
                borderRadius: 5,
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#D20000",
                  fontSize: 16,
                  fontFamily: "Poppins-Regular"
                }}
              >
                DAY
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontFamily: "Poppins-Regular"
                }}
              >
                Sat, 16 Nov
              </Text>
            </View>
            <View
              style={{
                width: "29%",
                backgroundColor: "#E9E9E9",
                height: 80,
                borderRadius: 5,
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#D20000",
                  fontSize: 16,
                  fontFamily: "Poppins-Regular"
                }}
              >
                TIME
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontFamily: "Poppins-Regular"
                }}
              >
                8:00-9:00
              </Text>
            </View>
            <View
              style={{
                width: "29%",
                backgroundColor: "#E9E9E9",
                height: 80,
                borderRadius: 5,
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#D20000",
                  fontSize: 16,
                  fontFamily: "Poppins-Regular"
                }}
              >
                PEOPLE
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontFamily: "Poppins-Regular"
                }}
              >
                2
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              borderWidth: 0.5,
              borderColor: "grey",
              marginTop: 15
            }}
          />
          <Ripple
            style={{
              marginTop: 15,
              alignSelf: "center",
              width: "95%",
              height: 55,
              borderRadius: 5,
              backgroundColor: "#d20000",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                color: "#fff"
              }}
            >
              Cancel Reservation
            </Text>
          </Ripple>
        </View>
      </SafeAreaView>
    );
  }
}
export default BookingConfirmation;
