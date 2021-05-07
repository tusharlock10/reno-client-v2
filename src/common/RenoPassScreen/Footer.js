import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {Text, View} from 'react-native';
import {width} from '../../constants';
import Ripple from 'react-native-material-ripple';
import {completePaymentRenoPass} from '../../utils/paymentUtil';
import {renoPassPurchase} from '../../actions/auth';

class Footer extends Component {
  state = {
    paymentLoading: false,
    paymentResponse: null,
  };

  async onPayment() {
    if (this.state.paymentResponse?.success) {
      this.props.navigation.pop();
      this.props.navigation.navigate('MyAccount');
      return;
    }

    this.setState({paymentLoading: true});
    const {time, price} = this.props;
    const {
      firstname,
      lastname,
      email,
      mobile,
      razorpayKeyId,
    } = this.props.auth.user;
    const name = `${firstname} ${lastname}`;
    const paymentResponse = await completePaymentRenoPass(razorpayKeyId, {
      name,
      email,
      mobile,
      amount: price,
      days: time,
    });

    this.props.renoPassPurchase(paymentResponse.data);

    this.setState({paymentLoading: false, paymentResponse});
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#000',
          shadowColor: '#00000029',
          shadowOpacity: 1,
          shadowOffset: {height: -3, width: 0},
          height: 75 + 25,
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: width,
        }}>
        <Ripple
          onPress={this.onPayment.bind(this)}
          style={{
            width: '90%',
            height: 55,
            marginTop: 10,
            backgroundColor: this.state.paymentResponse?.success
              ? 'green'
              : '#d20000',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.paymentLoading ? (
            <ActivityIndicator color={'#fff'} size={28} />
          ) : this.state.paymentResponse?.success ? (
            <>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  color: '#fff',
                }}>
                View your Reno Pass
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: '#fff',
                  marginTop: -5,
                }}>
                Payment Successful
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 17,
                  color: '#fff',
                }}>
                Buy Membership
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  color: '#fff',
                }}>
                For {this.props.time} @ ₹{this.props.price}
              </Text>
            </>
          )}
        </Ripple>
      </View>
    );
  }
}

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps, {renoPassPurchase})(Footer);
