import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  FlatList,
  ScrollView
} from "react-native";
import Ripple from "react-native-material-ripple";
import { width, height } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import PassesComponent from "./PassesComponent";
import axios from "../../api";
import Footer from "./Footer";
import { ActivityIndicator } from "react-native-paper";
class RenoPassScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPrice: null,
      cityData: null,
      time: null,
      loading: true
    };
  }
  async componentDidMount() {
    var cityData = await axios.get("/city/premiumAmount");
    this.setState({ cityData, loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="#d20000" size="large" animating />
          <Header navigation={this.props.navigation} color="#000" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <StatusBar backgroundColor="#000" barStyle="light-content" animated />
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={require("../../../assets/PassMain.png")}
              style={{ width, height: height * 0.3, marginBottom: 20 }}
              resizeMode="cover"
            />
            <PassesComponent
              priceFor90Days={this.state.cityData.data.premiumAmmount90}
              priceFor180Days={this.state.cityData.data.premiumAmmount180}
              priceFor360Days={this.state.cityData.data.premiumAmmount360}
              selectedPrice={(selectedPrice, time) =>
                this.setState({ selectedPrice, time })
              }
            />
            <Text
              style={{
                marginTop: 30,
                fontFamily: "Poppins-Bold",
                marginLeft: 25,
                fontSize: 22,
                color: "#d20000"
              }}
            >
              Why Reno Pass?
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Poppins-Medium",
                marginLeft: 25,
                fontSize: 17,
                color: "#fff"
              }}
            >
              Upto{" "}
              <Text style={{ fontFamily: "Poppins-SemiBold" }}>50% Off</Text> on
              Complete Bill
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Poppins-Medium",
                marginLeft: 25,
                fontSize: 17,
                color: "#fff"
              }}
            >
              No minimum bill required
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Poppins-Medium",
                marginLeft: 25,
                fontSize: 17,
                color: "#fff"
              }}
            >
              No coupons to print, just make a reservation, reach within time
              slot and unlock the deal
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Poppins-Medium",
                marginLeft: 25,
                fontSize: 17,
                marginBottom: 120,
                color: "#fff"
              }}
            >
              Access to all great restaurants across city accepting{" "}
              <Text
                style={{ fontFamily: "Poppins-SemiBold", color: "#299e49" }}
              >
                Reno Pay
              </Text>
            </Text>
          </ScrollView>
          <Footer
            navigation={this.props.navigation}
            price={this.state.selectedPrice}
            time={this.state.time}
          />
          <Header navigation={this.props.navigation} color="#fff" />
        </View>
      );
    }
  }
}
class Header extends Component {
  render() {
    return (
      <View
        style={{
          position: "absolute",
          width: width,
          top: 45,
          justifyContent: "center"
        }}
      >
        <Ionicons
          name="md-arrow-back"
          onPress={() => this.props.navigation.pop()}
          color={this.props.color}
          size={35}
          style={{ marginLeft: 15 }}
        />
      </View>
    );
  }
}
export default RenoPassScreen;
