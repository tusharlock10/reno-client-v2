//299e49 colour code for reno pay

import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import Image from 'react-native-fast-image';
import _ from 'lodash';
import {height, width} from '../../../../constants';
import {unlockDeal} from '../../../../actions/reservations';
import UpcomingBookingCard from './UpcomingBookingCard';

class UpcomingBooking extends Component {
  render() {
    if (!_.isEmpty(this.props.reservations.orders.upcomingOrders)) {
      return (
        <FlatList
          ListFooterComponent={<View style={{height: 150}} />}
          showsVerticalScrollIndicator={false}
          data={this.props.reservations.orders.upcomingOrders}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <UpcomingBookingCard
              item={item}
              index={index}
              unlockDeal={this.props.unlockDeal}
              navigation={this.props.navigation}
            />
          )}
        />
      );
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../../../assets/no-reservations.png')}
            style={{height: height * 0.3, width: width, marginTop: 50}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginTop: 20,
              fontSize: 26,
              color: '#000',
            }}>
            No Reservations Found
          </Text>
          <View style={{flex: 1, paddingHorizontal: 30}}>
            <Text
              style={{
                marginTop: 8,
                color: '#777777',
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                textAlign: 'center',
              }}>
              Reserve a table now and avail discounts on your bill
            </Text>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = ({reservations}) => ({reservations});

export default connect(mapStateToProps, {unlockDeal})(UpcomingBooking);
