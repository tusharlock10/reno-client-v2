import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ripple from "react-native-material-ripple";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { connect } from "react-redux";
import { facebookAuth, googleAuth, awaitAuth } from "../actions/auth";
import setAuthToken from "../utils/setAuthToken";
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  ShareDialog
} from "react-native-fbsdk";
// import axios from '../api';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

class LoginScreen extends Component {

  //State is managed using redux

  async componentDidMount() {
    const token = await AsyncStorage.getItem("jwtToken");
    if (token) {
      setAuthToken(token);
    }
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        "247753482400-5mh1i6oectdqks5sc34incak618pbbf4.apps.googleusercontent.com"
    });
  }

  signIn = async data => {
    this.props.awaitAuth(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.setState({ isVisible: false });

      //fire googleauth action
      this.props.googleAuth(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        this.props.awaitAuth(false);
      } else {
        console.log("google error", error);
        // some other error happened
      }
    }
  };

  fbLogin = async data => {
    this.props.awaitAuth(true);
    try {
      this.setState({ isVisible: true });
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email"
      ]);
      if (!result.isCancelled) {
        await this.makeGraphRequest();
      } else if (result.isCancelled) {
        this.props.awaitAuth(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async makeGraphRequest() {
    const infoRequest = new GraphRequest(
      "/me?fields=first_name,last_name,email",
      null,
      this._responseInfoCallback
    );
    const picRequest = new GraphRequest(
      "/me/picture?height=100&width=100",
      {
        parameters: {
          type: {
            string: "large"
          },
          redirect: {
            string: "false"
          }
        }
      },
      (error, result) => {
        console.log("graph result: ", result);
        // this.setState({
        //   profilepicurl: result.data.url
        // });
      }
    );
    new GraphRequestManager().addRequest(picRequest).start();
    new GraphRequestManager().addRequest(infoRequest).start();
  }
  _responseInfoCallback = async (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("FB Result is: ", result);
      this.props.facebookAuth(result);
    }
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ImageBackground
          source={require("../../assets/login_main.png")}
          style={{ height: height, width: width }}
        >
          <LinearGradient
            colors={["#FFFFFF", "#FFFFFFD4", "#FFFFFF00"]}
            style={{ height: height * 0.3, width: width, opacity: 0.7 }}
          />
          <Image
            source={require("../../assets/reno_logo_main.png")}
            style={{
              height: 90,
              width: 90,
              position: "absolute",
              top: 60,
              left: 30
            }}
          />
          <LinearGradient
            colors={["#FFFFFF00", "#FFFFFFD4", "#FFFFFF"]}
            // locations={[0, 0.55]}
            style={{
              height: height * 0.4,
              width: width,
              position: "absolute",
              bottom: 0
            }}
          >
            <Text
              style={{
                marginLeft: 45,
                marginTop: "30%",
                fontSize: 25,
                fontFamily: "Poppins-SemiBold"
              }}
            >
              Let's Get Started
            </Text>
            <Ripple
              rippleOpacity={0.2}
              onPress={() => this.signIn("data")}
              style={{
                height: 45,
                width: width * 0.8,
                borderColor: "#C7C7C7",
                borderWidth: 1,
                marginTop: 20,
                alignSelf: "center",
                backgroundColor: "#fff",
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#00000029",
                shadowOffset: { height: 1, width: 0 }
              }}
            >
              <Image
                source={require("../../assets/google.png")}
                style={{ height: 25, width: 25, marginLeft: 15 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 14,
                  fontFamily: "Poppins-Regular"
                }}
              >
                Continue with Google
              </Text>
            </Ripple>
            <Ripple
              rippleOpacity={0.2}
              onPress={() => this.fbLogin("data")}
              style={{
                height: 45,
                width: width * 0.8,
                borderColor: "#C7C7C7",
                borderWidth: 1,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "#fff",
                borderRadius: 8,
                shadowColor: "#00000029",
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 1
              }}
            >
              <Image
                source={require("../../assets/facebook.png")}
                style={{ height: 26, width: 26, marginLeft: 15 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 14,
                  fontFamily: "Poppins-Regular"
                }}
              >
                Continue with Facebook
              </Text>
            </Ripple>
          </LinearGradient>
        </ImageBackground>
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={{
            margin: 0
          }}
          isVisible={this.props.auth.loading}
        >
          <View
            style={{
              width: width * 0.9,
              height: 70,
              alignSelf: "center",
              alignItems: "center",
              flexDirection: "row",
              shadowColor: "#000",
              shadowOffset: { height: 2, width: 2 },
              shadowRadius: 10,
              shadowOpacity: 0.4,
              borderRadius: 5,
              backgroundColor: "#fff"
            }}
          >
            <ActivityIndicator
              size="large"
              color="#d20000"
              style={{ marginLeft: 30 }}
            />
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                marginLeft: 20,
                color: "grey",
                fontSize: 15
              }}
            >
              Verifying Credentials
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { facebookAuth, googleAuth, awaitAuth }
)(LoginScreen);
