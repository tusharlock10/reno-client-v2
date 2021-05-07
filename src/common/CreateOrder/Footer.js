import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {width} from '../../constants';
import Ripple from 'react-native-material-ripple';
class Footer extends Component {
  error = '';

  canConfirmBooking() {
    if (this.props.auth.user.hasActiveOrder) {
      this.error = 'You have an ongoing reservation';
      return false;
    }
    if (this.props.auth.user.hasPaymentDispute) {
      this.error = 'Payment pending for previous booking';
      return false;
    }

    if (!this.props.timeDiscountId) {
      this.error = 'Please select a slot';
      return false;
    }
    // function to determine if the user can confirm booking or not
    if (
      !this.props.phoneno.match(/\d/g) ||
      this.props.phoneno.match(/\d/g).length !== 10
    ) {
      this.error = 'Phone number is invalid';
      // if his number smaller then 10 digits then invalid
      return false;
    }
    if (this.props.name.trim().length < 2) {
      this.error = 'Name is too short';
      // if his name is smaller than 2 letters, then invalid
      return false;
    }
    this.error = '';
    return this.props.active;
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: {height: -3, width: 0},
          height: 80,
          elevation: 15,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <Ripple
          onPress={() => {
            if (this.canConfirmBooking()) {
              this.props.navigation.navigate('OTPScreen', {...this.props});
            } else {
              this.props.callbackFromParent(true, this.error);
            }
          }}
          style={{
            width: '90%',
            height: 55,
            backgroundColor: this.canConfirmBooking() ? '#d20000' : '#00000059',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              color: '#fff',
            }}>
            CONFIRM BOOKING
          </Text>
        </Ripple>
      </View>
    );
  }
}
export default Footer;
