import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import Image from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';
import _ from 'lodash';
import {getMyReservations} from '../../../actions/reservations';
import {height, width} from '../../../constants';
import {connect} from 'react-redux';
import Ripple from 'react-native-material-ripple';
import {isCurrentTimeInRange} from '../../../utils/dateTimeUtils';
class RenoPay extends Component {
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.props.getMyReservations();
    });
  }

  onPressUpcomingOrder(upcomingOrder, upcomingOrderIndex) {
    if (upcomingOrder.unlockActive) {
      this.props.navigation.navigate('EnterAmountScreen', {
        data: upcomingOrder,
      });
    } else {
      this.props.navigation.navigate('UpcomingDetails', {
        index: upcomingOrderIndex,
      });
    }
  }

  getUpcomingOrder = () => {
    if (this.props.reservations.loading) {
      return {upcomingOrder: null, upcomingOrderIndex: null};
    }
    const upcomingOrders = this.props.reservations.orders.upcomingOrders;

    for (let i = 0; i < upcomingOrders.length; i++) {
      const order = upcomingOrders[i];
      const canUnlockTheDeal = isCurrentTimeInRange(order.timeDiscount.time);
      const isUpcomingOrder =
        canUnlockTheDeal && order.restaurants.acceptsRenoPay;
      if (isUpcomingOrder) {
        return {upcomingOrder: order, upcomingOrderIndex: i};
      }
    }
    return {upcomingOrder: null, upcomingOrderIndex: null};
  };

  render() {
    const {upcomingOrder, upcomingOrderIndex} = this.getUpcomingOrder();

    return (
      <ScrollView
        style={{backgroundColor: '#fff'}}
        contentContainerStyle={{flexGrow: 1}}>
        <Image
          source={require('../../../../assets/ScanSoon.jpeg')}
          style={{height: height * 0.4, width: '100%'}}
          resizeMode="contain"
        />
        <Text
          style={{
            margin: 20,
            fontFamily: 'Poppins-Regular',
            color: '#707070',
            fontSize: 14,
          }}>
          You can search pay for the restaurants accepting
          <Text style={{color: '#299e49', fontFamily: 'Poppins-Medium'}}>
            {' '}
            Reno Pay.
          </Text>
        </Text>
        {!this.props.reservations.loading ? (
          upcomingOrder ? (
            <View>
              <Ripple
                style={{
                  padding: 15,
                  marginHorizontal: 10,
                  backgroundColor: '#d20000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }}
                onPress={() =>
                  this.props.navigation.navigate('SearchScreen', {
                    isRenoPay: true,
                  })
                }>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 18,
                    color: '#fff',
                  }}>
                  Search For Restaurants
                </Text>
              </Ripple>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#707070',
                    fontSize: 13,
                    marginTop: 20,
                    marginBottom: 10,
                  }}>
                  UPCOMING BOOKING
                </Text>
                <Ripple
                  style={{
                    width: width * 0.9,
                    height: 100,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    borderRadius: 6,
                    shadowOpacity: 0.25,
                    shadowColor: '#000',
                    shadowOffset: {height: 2, width: 2},
                    shadowRadius: 7,
                    elevation: 7,
                  }}
                  onPress={this.onPressUpcomingOrder.bind(
                    this,
                    upcomingOrder,
                    upcomingOrderIndex,
                  )}>
                  <Image
                    source={{
                      uri: upcomingOrder.restaurants.imageurl,
                    }}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 5,
                      marginLeft: 12,
                    }}
                  />
                  <View style={{margin: 10, justifyContent: 'space-between'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#000',
                        fontSize: 16,
                      }}>
                      {upcomingOrder.restaurants.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#d20000',
                        fontSize: 16,
                      }}>
                      {upcomingOrder.timeDiscount.time}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: upcomingOrder.unlockActive
                          ? '#299e49'
                          : '#707070',
                        fontSize: 14,
                      }}>
                      {upcomingOrder.unlockActive
                        ? 'Click to pay'
                        : 'Click to unlock the deal'}
                    </Text>
                  </View>
                </Ripple>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 30,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#707070',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                No upcoming bookings for{' '}
                <Text
                  style={{fontFamily: 'Poppins-SemiBold', color: '#299e49'}}>
                  Reno Pay
                </Text>{' '}
                restaurants
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              width,
              height: 55,
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color="#d20000" size="small" />
          </View>
        )}
      </ScrollView>
    );
  }
}

mapStateToProps = (state) => {
  return {reservations: state.reservations};
};

export default connect(mapStateToProps, {getMyReservations})(RenoPay);
