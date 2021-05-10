import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../utils/setAuthToken';
import setCityValue from '../utils/setCityValue';
import {connect} from 'react-redux';
import {loadUser} from '../actions/auth';
import {height, width} from '../constants';
import Video from 'react-native-video';
import OneSignal from 'react-native-onesignal';

class SplashScreen extends Component {
  state = {};

  componentDidMount() {
    if (!__DEV__) {
      OneSignal.setAppId('8038393c-ded4-4abc-ac70-4fa7a7668312');
    }
    setTimeout(this._navigateTo.bind(this), __DEV__?0:4000);
  }

  async _navigateTo() {
    console.log('HERE');
    // await AsyncStorage.setItem("city", "Indore");
    const token = await AsyncStorage.getItem('jwtToken');
    const city = await AsyncStorage.getItem('city');

    if (token && city) {
      setCityValue(city);
      setAuthToken(token);
      this.props.loadUser(() => {
        this.props.navigation.replace('Main');
      });
    } else {
      this.props.navigation.replace('LoginScreen');
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        {/*<Image
          source={require("../../assets/splash_screen.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />*/}
        <Video
          ref={(ref) => {
            this.videoplayer = ref;
          }}
          rate={0.9}
          source={require('../../assets/SplashScreen.mp4')}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {auth: state.auth};
};

export default connect(mapStateToProps, {loadUser})(SplashScreen);
