import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import Image from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {width, height} from '../../constants';
import OTPInput from './OTPInput';
import Footer from './Footer';
import axios from '../../api';
import {Snackbar} from 'react-native-paper';
class OTPScreen extends Component {
  async componentDidMount() {
    await axios.post('/bookingOtp', {
      mobile: this.props.route.params.phoneno,
      restaurantId: this.props.route.params.restaurantId,
    });
  }
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      otp: '',
      active: false,
    };
  }

  render() {
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
              {' '}
              +91 {this.props.route.params.phoneno}
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
            people={this.props.route.params.people}
            timeDiscountId={this.props.route.params.timeDiscountId}
            restaurantId={this.props.route.params.restaurantId}
            date={this.props.route.params.date}
            name={this.props.route.params.name}
            mobile={this.props.route.params.phoneno}
            otp={this.state.otp}
            navigation={this.props.navigation}
            active={this.state.visible}
            showSnackbar={(state) => this.setState({active: state})}
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

export default OTPScreen;
