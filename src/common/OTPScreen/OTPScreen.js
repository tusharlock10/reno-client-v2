import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import Image from 'react-native-fast-image';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {width, height} from '../../constants';
import OTPInput from './OTPInput';
import Footer from './Footer';
import axios from '../../api';
import {Snackbar} from 'react-native-paper';
import {confirmBooking} from '../../actions/createorder';

class OTPScreen extends Component {
  state = {
    visible: false,
    otp: __DEV__ ? '0000' : '',
    active: false,
  };

  async componentDidMount() {
    await axios.post('/bookingOtp', {
      mobile: this.props.route.params.phoneno,
      restaurantId: this.props.route.params.restaurantId,
    });
  }

  render() {
    const {
      people,
      timeDiscountId,
      restaurantId: restaurantsId,
      name,
      date,
      phoneno: mobile,
    } = this.props.route.params;

    return (
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <Header navigation={this.props.navigation} />
        <Image
          source={require('../../../assets/otpAsset.png')}
          style={{height: height / 4, width, alignSelf: 'center'}}
          resizeMode="contain"
        />
        <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 22,
              color: '#000',
            }}>
            OTP Verification
          </Text>
          <Text
            style={{
              paddingTop: 10,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 19,
              color: '#797f87',
            }}>
            Enter OTP send to
            <Text style={{fontFamily: 'Poppins-Bold', color: '#767d86'}}>
              {` +91 ${mobile}`}
            </Text>
          </Text>
          <OTPInput
            otpCallback={(otp) => this.setState({otp})}
            callbackFromChild={(visible) => {
              if (visible == 'show') {
                this.setState({visible: true});
              } else {
                this.setState({visible: false});
              }
            }}
          />

          <Footer
            navigation={this.props.navigation}
            active={this.state.visible}
            showSnackbar={(state) => this.setState({active: state})}
            confirmBooking={this.props.confirmBooking}
            data={{
              people,
              mobile,
              timeDiscountId,
              restaurantsId,
              name,
              date,
              otp: this.state.otp,
            }}
          />
          <Snackbar
            visible={this.state.active}
            theme={{colors: {accent: 'white'}}}
            style={{
              position: 'absolute',
              bottom: 0,
              elevation: 17,
              backgroundColor: '#d20000',
              height: 55,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 5,
            }}
            onDismiss={() => this.setState({active: false})}
            action={{
              label: 'Okay',
              onPress: () => {},
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
                color: '#fff',
              }}>
              Incorrect OTP
            </Text>
          </Snackbar>
        </View>
      </SafeAreaView>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <View style={{width, height: 55, justifyContent: 'center'}}>
        <Ionicons
          name="md-arrow-back"
          onPress={() => this.props.navigation.goBack()}
          color="#000"
          size={35}
          style={{marginLeft: 15}}
        />
      </View>
    );
  }
}

export default connect(null, {confirmBooking})(OTPScreen);
