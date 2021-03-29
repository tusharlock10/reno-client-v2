import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import Image from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';
import _ from 'lodash';
import {getMyReservations} from '../../../actions/reservations';
import {height, width} from '../../../constants';
import {connect} from 'react-redux';
import Ripple from 'react-native-material-ripple';
class RenoPay extends Component {
  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => {
      this.props.getMyReservations();
    });
  }
  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
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
          !_.isEmpty(this.props.reservations.orders.upcomingOrders) ? (
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
                  onPress={() =>
                    this.props.navigation.navigate('EnterAmountScreen', {
                      data: this.props.reservations.orders.upcomingOrders[0],
                    })
                  }>
                  <Image
                    source={{
                      uri: this.props.reservations.orders.upcomingOrders[0]
                        .restaurants.imageurl,
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
                      {
                        this.props.reservations.orders.upcomingOrders[0]
                          .restaurants.name
                      }
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#d20000',
                        fontSize: 16,
                      }}>
                      {
                        this.props.reservations.orders.upcomingOrders[0]
                          .timeDiscount.time
                      }
                    </Text>
                  </View>
                </Ripple>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    color: '#000',
                    marginTop: 10,
                  }}>
                  click on the above card to make payment
                </Text>
              </View>
            </View>
          ) : (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#707070',
                fontSize: 16,
                marginTop: 20,
                marginBottom: 10,
              }}>
              No Upcoming Bookings
            </Text>
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
