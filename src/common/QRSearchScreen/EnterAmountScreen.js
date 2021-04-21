import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import {completePayment} from '../../utils/paymentUtil';
import UpcomingBookingCard from '../../components/Tabs/Reservations/UpcomingBooking/UpcomingBookingCard';

class EnterAmountScreen extends Component {
  state = {
    amount: __DEV__ ? '123' : '',
    paymentLoading: false,
    paymentResponse: null,
  };

  processPayment = async () => {
    if (!/^[0-9]+$/.test(this.state.amount)) {
      return;
    }
    this.setState({paymentLoading: true});
    const {name, email, mobile} = this.props.auth.user;
    const data = {
      name,
      email,
      mobile,
      amount: parseInt(this.state.amount),
      orderId: this.props.route.params.data.id,
    };
    const paymentResponse = await completePayment(data);
    this.setState({paymentLoading: false, paymentResponse});
  };

  renderHeader() {
    return (
      <View style={styles.headingView}>
        <Ionicons
          name="md-arrow-back"
          size={28}
          color={'#000'}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.headingText}>Reno Pay</Text>
      </View>
    );
  }

  renderBookingCard() {
    return (
      <UpcomingBookingCard
        infoOnly={true}
        item={this.props.route.params.data}
      />
    );
  }

  renderAmountInput() {
    return (
      <View style={{marginTop: 30, marginHorizontal: 10}}>
        <View style={styles.amountView}>
          <FontAwesome name="rupee" size={16} color="#707070" />
          <TextInput
            style={styles.amountInput}
            keyboardType={'number-pad'}
            value={this.state.amount}
            onChangeText={(amount) => this.setState({amount})}
            placeholderTextColor="#707070"
            placeholder="Enter bill amount"
          />
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            color: '#707070',
            marginLeft: 10,
          }}>
          *Enter the bill amount with the discount applied
        </Text>
      </View>
    );
  }

  renderPaymentButton() {
    const {paymentResponse} = this.state;
    if (paymentResponse) {
      return null;
    }
    return (
      <Ripple
        onPress={this.processPayment.bind(this)}
        style={{
          backgroundColor: this.state.amount > 0 ? '#d20000' : '#00000059',
          ...styles.payButtonView,
        }}>
        {this.state.amount > 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.payButtonText}>Pay ₹{this.state.amount}</Text>
            <Text
              style={{
                ...styles.payButtonText,
                fontSize: 12,
              }}>
              via Reno Pay
            </Text>
          </View>
        ) : (
          <Text style={styles.payButtonText}>Pay Securely</Text>
        )}
      </Ripple>
    );
  }

  renderPaymentLoading() {
    const {paymentResponse} = this.state;
    if (paymentResponse) {
      return null;
    }
    return (
      <View style={styles.paymentLoadingView}>
        <ActivityIndicator size={28} color={'#707070'} />
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            includeFontPadding: false,
            color: '#707070',
            marginLeft: 10,
          }}>
          Payment Processing
        </Text>
      </View>
    );
  }

  renderPaymentStatus() {
    const {paymentResponse} = this.state;
    if (!paymentResponse) {
      return null;
    }
    return (
      <View style={styles.paymentLoadingView}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            includeFontPadding: false,
            color: paymentResponse.success ? 'green' : '#d20000',
            marginLeft: 10,
          }}>
          {paymentResponse.success ? 'Payment Successful' : 'Payment Failed'}
        </Text>
      </View>
    );
  }

  renderPaymentFooter() {
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{padding: 10, backgroundColor: '#fff', elevation: 20}}>
          {this.state.paymentLoading
            ? this.renderPaymentLoading()
            : this.renderPaymentButton()}
          {this.renderPaymentStatus()}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
        {this.renderHeader()}
        {this.renderBookingCard()}
        {this.renderAmountInput()}
        {this.renderPaymentFooter()}
      </View>
    );
  }
}

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps, {})(EnterAmountScreen);

const styles = StyleSheet.create({
  headingView: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    elevation: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headingText: {
    marginLeft: 20,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#000',
  },
  amountView: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#707070',
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 5,
    height: 50,
    paddingHorizontal: 10,
  },
  amountInput: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginLeft: 10,
    paddingVertical: 0,
    paddingHorizontal: 0,
    flex: 1,
    marginTop: 3,
  },
  payButtonView: {
    height: 55,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  paymentLoadingView: {
    height: 55,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
