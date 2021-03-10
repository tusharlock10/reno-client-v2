import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Linking,
  ScrollView
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { width, height } from "../../constants";
import { Searchbar } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import Ripple from "react-native-material-ripple";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
class Support extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
            onPress={() => this.props.navigation.pop()}
            color="#000"
            size={28}
            style={{ marginLeft: 15 }}
          />
          <Text
            style={{
              marginLeft: 20,
              fontFamily: "Poppins-Medium",
              color: "#000",
              fontSize: 25
            }}
          >
            Support
          </Text>
        </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text
              style={{
                marginTop: 15,
                alignSelf: "center",
                fontFamily: "Poppins-Regular",
                color: "#000",
                fontSize: 17
              }}
            >
              Hi Naman, how can we help you today?
            </Text>
            <Searchbar
              style={{
                marginTop: 10,
                width: width * 0.92,
                height: 50,
                marginBottom: 10,
                alignSelf: "center",
                backgroundColor: "#fff",
                shadowOpacity: 0.25,
                borderRadius: 10
              }}
              placeholder='Search a  "Query"'
              placeholderTextColor="#D1D1D1"
              inputStyle={{
                color: "#3E3E3E",
                fontFamily: "Poppins-Regular",
                fontSize: 16
              }}
              autoFocus={false}
              selectionColor="#d20000"
            />
            <View
              style={{
                height: 40,
                marginTop: 15,
                width,
                backgroundColor: "#E9E9E9",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#000",
                  fontSize: 17,
                  marginLeft: 10
                }}
              >
                Popular Searches
              </Text>
            </View>
            <FaqQuery query="How do I get my discount?" />
            <FaqQuery query="Do I have to pay any reservation fees?" />
            <FaqQuery query="Can I cancel or change my reservation?" />
            <Ripple
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                height: 40
              }}
            >
              <View style={{ width: "80%", justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 15,
                    fontFamily: "Poppins-Bold",
                    color: "#000"
                  }}
                >
                  Other FAQs
                </Text>
              </View>
              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Entypo name="chevron-right" color="#000" size={24} />
              </View>
            </Ripple>
            <View
              style={{
                height: 40,
                marginTop: 15,
                width,
                backgroundColor: "#E9E9E9",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#000",
                  fontSize: 17,
                  marginLeft: 10
                }}
              >
                Still need help?
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Poppins-Light",
                alignSelf: "center",
                color: "#000",
                margin: 10,
                marginTop: 20
              }}
            >
              We aim to respond within 1 business day. Our working hours are
              from Monday to Friday, 9AM - 6PM.
            </Text>
            <Ripple
              rippleColor={"#000"}
              onPress={() => Linking.openURL("tel://+917000449336")}
              style={{
                height: 55,
                marginTop: 20,
                width: width * 0.9,
                alignSelf: "center",
                borderRadius: 8,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#000"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Foundation name="telephone" size={26} color="#000" />
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    color: "#000",
                    fontSize: 18,
                    marginLeft: 10
                  }}
                >
                  Call us directly
                </Text>
              </View>
            </Ripple>
            <Ripple
              onPress={() =>
                Linking.openURL(
                  "https://api.whatsapp.com/send?phone=917000449336&text=Enter%20Your%20Query%20Here..."
                )
              }
              rippleColor="#075e54"
              style={{
                height: 55,
                marginTop: 20,
                width: width * 0.9,
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#075e54"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FontAwesome5
                  name="whatsapp-square"
                  size={36}
                  color="#075e54"
                />
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    color: "#075e54",
                    fontSize: 18,
                    marginLeft: 12
                  }}
                >
                  For 24x7 help, Whatsapp us
                </Text>
              </View>
            </Ripple>
          </ScrollView>
      </SafeAreaView>
    );
  }
}
class FaqQuery extends Component {
  render() {
    return (
      <Ripple
        style={{
          height: 40,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10
        }}
      >
        <View style={{ width: "80%", justifyContent: "center" }}>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 16,
              fontFamily: "Poppins-Regular",
              color: "#000"
            }}
          >
            {this.props.query}
          </Text>
        </View>
        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Entypo name="chevron-right" color="#000" size={24} />
        </View>
      </Ripple>
    );
  }
}
export default Support;
