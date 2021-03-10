import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import axios from "../../api";
import Header from "./Header";
import { WebView } from "react-native-webview";
import { width, height } from "../../constants";

class PaymentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      success: false
    };
  }
  async componentDidMount() {
    var selectedDays = "";
    if (this.props.navigation.state.params.days == "90 days") {
      selectedDays = "90";
    } else if (this.props.navigation.state.params.days == "180 days") {
      selectedDays = "180";
    } else if (this.props.navigation.state.params.days == "360 days") {
      selectedDays = "360";
    }
    var response = await axios.post("/reno/get-premium-membership", {
      days: selectedDays
    });
    console.log(response);
    this.setState({ data: response.data });
  }
  render() {
    console.log(this.state);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header navigation={this.props.navigation} />
        {this.state.data == null ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#d20000" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <WebView
              style={{ width, height }}
              source={{
                html: this.state.data
              }}
              // injectedJavaScript={jsCode}
              onNavigationStateChange={data => {
                console.log(data);
                if (data.title == "Success") {
                  this.setState({ success: true });
                }
              }}
              // onMessage={this.onMessage}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
export default PaymentScreen;
