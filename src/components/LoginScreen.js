import React, {Component} from 'react';
import {Text, View, ImageBackground, Image, Dimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {connect} from 'react-redux';
import {facebookAuth, googleAuth, awaitAuth} from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

class LoginScreen extends Component {
  //State is managed using redux

  async componentDidMount() {
    const token = await AsyncStorage.getItem('jwtToken');
    if (token) {
      setAuthToken(token);
    }
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        '247753482400-5mh1i6oectdqks5sc34incak618pbbf4.apps.googleusercontent.com',
    });
  }

  signIn = async (data) => {
    this.props.awaitAuth(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({isVisible: false});

      this.props.googleAuth(userInfo, this.props.navigation);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        this.props.awaitAuth(false);
      } else {
        console.error(error);
      }
    }
  };

  fbLogin = async () => {
    this.props.awaitAuth(true);
    this.setState({isVisible: true});
    const response = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (response.isCancelled) {
      this.props.awaitAuth(false);
    } else {
      this.getFbUserData();
    }
  };

  async getFbUserData() {
    const {userID, accessToken} = await AccessToken.getCurrentAccessToken();
    const uri = `https://graph.facebook.com/${userID}?fields=email,picture.type(large),name&access_token=${accessToken}`;

    const result = await fetch(uri)
      .then((response) => response.json())
      .catch((e) => {
        this._responseInfoCallback(e, null);
      });

    this._responseInfoCallback(null, result);
  }

  _responseInfoCallback = async (error, result) => {
    if (error) {
      console.error(error);
    } else {
      this.props.facebookAuth(result, this.props.navigation);
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          source={require('../../assets/login_main.png')}
          style={{height: height, width: width}}>
          <LinearGradient
            colors={['#FFFFFF', '#FFFFFFD4', '#FFFFFF00']}
            style={{height: height * 0.3, width: width, opacity: 0.7}}
          />
          <Image
            source={require('../../assets/reno_logo_main.png')}
            style={{
              height: 90,
              width: 90,
              position: 'absolute',
              top: 60,
              left: 30,
            }}
          />
          <LinearGradient
            colors={['#FFFFFF00', '#FFFFFFD4', '#FFFFFF']}
            // locations={[0, 0.55]}
            style={{
              height: height * 0.4,
              width: width,
              position: 'absolute',
              bottom: 0,
            }}>
            <Text
              style={{
                marginLeft: 45,
                marginTop: '30%',
                fontSize: 25,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Let's Get Started
            </Text>
            <Ripple
              rippleOpacity={0.2}
              onPress={() => this.signIn('data')}
              style={{
                height: 45,
                width: width * 0.8,
                borderColor: '#C7C7C7',
                borderWidth: 1,
                marginTop: 20,
                alignSelf: 'center',
                backgroundColor: '#fff',
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#00000029',
                shadowOffset: {height: 1, width: 0},
              }}>
              <Image
                source={require('../../assets/google.png')}
                style={{height: 25, width: 25, marginLeft: 15}}
                resizeMode="contain"
              />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Continue with Google
              </Text>
            </Ripple>
            <Ripple
              rippleOpacity={0.2}
              onPress={() => this.fbLogin()}
              style={{
                height: 45,
                width: width * 0.8,
                borderColor: '#C7C7C7',
                borderWidth: 1,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: '#fff',
                borderRadius: 8,
                shadowColor: '#00000029',
                shadowOffset: {height: 1, width: 0},
                shadowOpacity: 1,
              }}>
              <Image
                source={require('../../assets/facebook.png')}
                style={{height: 26, width: 26, marginLeft: 15}}
                resizeMode="contain"
              />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Continue with Facebook
              </Text>
            </Ripple>
          </LinearGradient>
        </ImageBackground>
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={{
            margin: 0,
          }}
          isVisible={this.props.auth.loading}>
          <View
            style={{
              width: width * 0.9,
              height: 70,
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: {height: 2, width: 2},
              shadowRadius: 10,
              shadowOpacity: 0.4,
              borderRadius: 5,
              backgroundColor: '#fff',
            }}>
            <ActivityIndicator
              size="large"
              color="#d20000"
              style={{marginLeft: 30}}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginLeft: 20,
                color: 'grey',
                fontSize: 15,
              }}>
              Verifying Credentials
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {auth: state.auth};
};

export default connect(mapStateToProps, {facebookAuth, googleAuth, awaitAuth})(
  LoginScreen,
);
