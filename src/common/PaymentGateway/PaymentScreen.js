import React, {Component} from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';
import {connect} from 'react-redux';
import Header from './Header';
import {completePaymentRenoPass} from '../../utils/paymentUtil';

class PaymentScreen extends Component {
  async onPayment() {
    const {days, amount} = this.props.route.params;
    const {firstname, lastname, email, mobile} = this.props.auth.user;
    const name = `${firstname} ${lastname}`;
    completePaymentRenoPass({
      amount,
      name,
      email,
      mobile,
      days,
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Header navigation={this.props.navigation} />
        <Text>Hello</Text>
        <Button onPress={this.onPayment.bind(this)} title="Pay" />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps, {})(PaymentScreen);
