import React, {Component} from 'react';
import {ActivityIndicator, Text, View, SafeAreaView} from 'react-native';
import Image from 'react-native-fast-image';
import {connect} from 'react-redux';
import {height, width} from '../../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import {unlockDeal, cancelOrder} from '../../../../actions/reservations';
import {
  isCurrentTimeInRange,
  getDayFromNumber,
} from '../../../../utils/dateTimeUtils';
import moment from 'moment';

class UpcomingDetails extends Component {
  state = {cancelLoading: false};

  renderUnlockButton() {
    const order = this.props.route.params.data;

    const canUnlockTheDeal = isCurrentTimeInRange(order.timeDiscount.time);

    if (!order.restaurants.acceptsRenoPay) {
      return null;
    }

    return (
      <Ripple
        onPress={() => {
          if (order.unlockActive) {
            this.props.navigation.navigate('EnterAmountScreen', {
              data: order,
            });
          } else if (canUnlockTheDeal) {
            this.props.unlockDeal(order.id);
          }
        }}
        style={{
          borderRadius: 12,
          elevation: 5,
          paddingHorizontal: 20,
          paddingVertical: 7,
          alignSelf: 'center',
          backgroundColor: order.unlockActive
            ? '#299e49'
            : canUnlockTheDeal
            ? '#D20000'
            : '#7a7a7a',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Poppins-Regular',
            color: '#fff',
          }}>
          {order.unlockActive ? 'Pay with Reno Pay' : 'Unlock your visit'}
        </Text>
      </Ripple>
    );
  }

  render() {
    // getting this order directly from the redux state to update the order details live
    const order = this.props.route.params.data;
    if (!order) {
      return <View />;
    }
    const discountProperty =
      getDayFromNumber(new Date(order.date).getDay()).substring(0, 3) +
      'Discount';
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#F8F8F8'}}
        forceInset={{top: 'never'}}>
        <Image
          source={{
            uri: order.restaurants.imageurl,
          }}
          style={{
            height: height * 0.25,
            marginBottom: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width,
          }}
          resizeMode="cover">
          <Ionicons
            name="md-arrow-back"
            onPress={() => this.props.navigation.goBack()}
            color="#fff"
            size={35}
            style={{marginTop: 45, marginLeft: 15}}
          />
          <View
            style={{
              height: 38,
              width: 60,
              marginTop: 45,
              opacity: 0.8,
              //   borderTopLeftRadius: 5,
              //   borderBottomLeftRadius: 5,
              flexDirection: 'row',
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 19,
                color: '#000',
              }}>
              {order.restaurants.rating}
            </Text>
            <Ionicons
              name="ios-star"
              color="#000"
              size={20}
              style={{marginLeft: 5}}
            />
          </View>
        </Image>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 25,
                textAlign: 'center',
                color: '#000',
              }}>
              {order.restaurants.name}
            </Text>
            <View
              style={{
                backgroundColor: '#d2d2d2',
                width: width * 0.95,
                marginTop: 5,
                marginBottom: 5,
                height: 1.5,
              }}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 18,
                opacity: 0.7,
                color: '#000',
              }}>
              {order.restaurants.city}
            </Text>
          </View>
          {this.renderUnlockButton()}
          <View
            style={{
              marginTop: 15,
              borderRadius: 10,
              marginHorizontal: 10,
              backgroundColor: '#fff',
              flex: 1,
              elevation: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 14,
                textAlign: 'justify',
                margin: 10,
              }}>
              {order.restaurants.acceptsRenoPay
                ? `Please unlock your visit ID at the restaurant. Unlock option appears only in the given time slot for which the reservation is made. After unlocking, you can pay anytime before leaving the restaurant via Renopay`
                : 'Pay at the restaurant'}
            </Text>
          </View>
          <Text
            style={{
              color: '#d20000',
              marginTop: 20,
              marginLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize: 18,
            }}>
            Reservation Details
          </Text>
          <View
            style={{
              marginTop: 5,
              borderRadius: 10,
              marginHorizontal: 10,
              backgroundColor: '#fff',
              flex: 1,
              elevation: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 16,
                margin: 10,
                marginTop: 20,
                marginBottom: 0,
              }}>
              {'Reservation Slot '}
              <Text
                style={{
                  color: '#d20000',
                }}>
                {order.timeDiscount.time}
              </Text>
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                color: '#000',
                margin: 10,
              }}>
              {'Discount Availed '}
              <Text
                style={{
                  color: '#d20000',
                }}>
                {order.timeDiscount[discountProperty]}%
              </Text>
            </Text>
          </View>
          <Text
            style={{
              color: '#d20000',
              marginTop: 20,
              marginLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize: 18,
            }}>
            Personal Details
          </Text>
          <View
            style={{
              marginTop: 5,
              borderRadius: 10,
              marginHorizontal: 10,
              backgroundColor: '#fff',
              flex: 1,
              elevation: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Feather name="user" color="#000" size={18} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: '#d20000',
                  marginLeft: 10,
                }}>
                {order.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Feather name="phone" color="#000" size={18} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: '#d20000',
                  marginLeft: 10,
                }}>
                {order.mobile}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              }}>
              <Feather name="users" color="#000" size={18} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: '#d20000',
                  marginLeft: 10,
                }}>
                {order.people} Member{`${order.people === 1 ? '' : 's'}`}
              </Text>
            </View>
          </View>
          <Ripple
            onPress={() => {
              this.setState({cancelLoading: true});
              this.props.cancelOrder(order.id, () =>
                this.props.navigation.goBack(),
              );
            }}
            rippleColor="#d20000"
            style={{
              marginVertical: 20,
              borderRadius: 10,
              borderWidth: 1.5,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#d20000',
              elevation: 4,
              backgroundColor: '#fff',
              alignSelf: 'center',
              height: 45,
              width: '90%',
            }}>
            {this.state.cancelLoading ? (
              <ActivityIndicator color={'#d20000'} size={28} />
            ) : (
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  color: '#d20000',
                }}>
                Cancel Reservation
              </Text>
            )}
          </Ripple>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({reservations}) => ({reservations});

export default connect(mapStateToProps, {unlockDeal, cancelOrder})(
  UpcomingDetails,
);
