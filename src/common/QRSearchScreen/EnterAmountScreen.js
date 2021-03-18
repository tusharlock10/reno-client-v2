import React, {Component} from 'react';
import {Text, View, SafeAreaView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import Image from 'react-native-fast-image';
import {width} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import {completePayment} from '../../utils/paymentUtil';

class EnterAmountScreen extends Component {
  state = {
    amount: '',
  };

  processPayment() {
    console.log('PROPS : ', this.props);
    const paymentData = {
      amount: parseInt(this.state.amount),
      name: this.props.auth.name,
      email: this.props.auth.email,
      mobile: this.props.auth.mobile,
    };
    completePayment(paymentData);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            width,
            height: 55,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Ionicons
            name="md-arrow-back"
            onPress={() => this.props.navigation.pop()}
            color="#000"
            size={28}
            style={{marginLeft: 15}}
          />
          <Text
            style={{
              marginLeft: 20,
              fontFamily: 'Poppins-Medium',
              color: '#000',
              fontSize: 20,
            }}>
            Reno Pay
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Image
            source={{uri: this.props.navigation.state.params.imageurl}}
            style={{height: 120, width: 120, borderRadius: 10}}
            resizeMode="cover"
          />
          <View
            style={{
              margin: 10,
              width: '50%',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 18,
                color: '#000',
              }}>
              {this.props.navigation.state.params.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#7a7a7a',
                fontSize: 18,
              }}>
              {this.props.navigation.state.params.city}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 50,
            width: '95%',
            alignItems: 'center',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#707070',
            marginTop: 30,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <FontAwesome
            name="rupee"
            size={20}
            color="#000"
            style={{marginLeft: 15}}
          />
          <TextInput
            style={{
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
              color: '#000',
              marginLeft: 10,
            }}
            value={this.state.amount}
            onChangeText={(text) => this.setState({amount: text})}
            selectionColor="#d20000"
            placeholderTextColor="#707070"
            placeholder="Enter bill amount"
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            shadowColor: '#00000029',
            shadowOpacity: 1,
            shadowOffset: {height: -3, width: 0},
            height: 85,
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: width,
          }}>
          <Ripple
            onPress={this.processPayment.bind(this)}
            style={{
              width: '90%',
              height: 55,
              marginTop: 10,
              backgroundColor: this.state.amount > 0 ? '#d20000' : '#00000059',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.state.amount > 0 ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  Pay @ ₹{this.state.amount}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 14,
                    color: '#fff',
                  }}>
                  via Reno Pay
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 17,
                  color: '#fff',
                }}>
                Pay Securely
              </Text>
            )}
          </Ripple>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps)(EnterAmountScreen);
