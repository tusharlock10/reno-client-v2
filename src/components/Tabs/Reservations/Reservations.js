import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import TabBarComponent from '../../../common/TabBarComponent';
import UpcomingBooking from './UpcomingBooking';
import PastBooking from './PastBooking/PastBooking';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getMyReservations} from '../../../actions/reservations';
import {ActivityIndicator} from 'react-native-paper';
class Reservations extends Component {
  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => {
      this.props.getMyReservations();
    });
  }
  render() {
    if (this.props.reservations.orders) {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F1F0F0'}}>
          <TabBarComponent
            upcomingBooking={
              <UpcomingBooking
                navigation={this.props.navigation}
                data={
                  this.props.reservations.orders
                    ? this.props.reservations.orders.upcomingOrders
                    : null
                }
              />
            }
            pastBooking={
              <PastBooking
                navigation={this.props.navigation}
                data={
                  this.props.reservations.orders
                    ? this.props.reservations.orders.completedOrders
                    : null
                }
              />
            }
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} color="#d20000" size="large" />
        </View>
      );
    }
  }
}

mapStateToProps = (state) => {
  return {reservations: state.reservations};
};

export default connect(mapStateToProps, {getMyReservations})(Reservations);
