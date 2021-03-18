import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Image from 'react-native-fast-image'
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import {height, width} from '../../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import {getPermission} from '../../../../utils/permissions';
import {updateUpcomingReservation} from '../../../../actions/reservations';
import axios from '../../../../api';

class UpcomingDetails extends Component {
  state = {
    order: this.props.navigation.state.params.data,
  };

  unlockDeal = async (data) => {
    // data = { orderId, longitude, latitude }
    const response = await axios.post('/unlockDeal', data);
    this.props.updateUpcomingReservation(response.data);
    this.setState({order: response.data});
  };

  onUnlockTheDeal() {
    if (!getPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
      Alert.alert(
        'Location required',
        'We require your location to unlock the deal',
      );
    }

    Geolocation.getCurrentPosition(
      (position) => {
        this.unlockDeal({
          ...position.coords,
          orderId: this.state.order.id,
        });
      },
      (error) => console.error(error),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#F8F8F8'}}
        forceInset={{top: 'never'}}>
        <Image
          source={{
            uri: this.state.order.restaurants.imageurl,
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
            onPress={() => this.props.navigation.pop()}
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
              {this.state.order.restaurants.rating}
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
              {this.state.order.restaurants.name}
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
              {this.state.order.restaurants.city}
            </Text>
          </View>
          <Ripple
            onPress={() => {
              if (!this.state.order.unlockActive) {
                this.onUnlockTheDeal();
              } else {
                this.props.navigation.navigate('RenoPay');
              }
            }}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              elevation: 5,
              backgroundColor: this.state.order.unlockActive
                ? '#299e49'
                : '#D20000',
              shadowOffset: {height: 4, width: 2},
              shadowRadius: 5,
              shadowOpacity: 2,
            }}>
            <Text
              style={{
                margin: 15,
                fontSize: 17,
                fontFamily: 'Poppins-Regular',
                color: '#fff',
              }}>
              {this.state.order.unlockActive
                ? 'Pay with Reno Pay'
                : 'Unlock your visit'}
            </Text>
          </Ripple>
          <View
            style={{
              marginTop: 20,
              shadowColor: '#00000029',
              shadowOffset: {height: 2, width: 2},
              shadowRadius: 7,
              borderRadius: 5,
              backgroundColor: '#fff',
              shadowOpacity: 1,
              width: width * 0.96,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 14,
                margin: 10,
              }}>
              Please unlock your Visit ID at the restaurant. Unlock option
              appears only in the given time slot for which the reservation is
              made.
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
              shadowColor: '#00000029',
              shadowOffset: {height: 2, width: 2},
              shadowRadius: 7,
              borderRadius: 5,
              backgroundColor: '#fff',
              shadowOpacity: 1,
              width: width * 0.96,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 15,
                margin: 10,
              }}>
              {new Date(this.state.order.date).toDateString()}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 15,
                marginLeft: 10,
              }}>
              {this.state.order.timeDiscount.time}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 15,
                  color: '#000',
                }}>
                Discount Availed
              </Text>
              <View
                style={{
                  width: 40,
                  height: 35,
                  backgroundColor: '#fff',
                  marginLeft: 15,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#d20000',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    color: '#d20000',
                  }}>
                  {this.state.order.timeDiscount.discount}%
                </Text>
              </View>
            </View>
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
              shadowColor: '#00000029',
              shadowOffset: {height: 2, width: 2},
              shadowRadius: 7,
              borderRadius: 5,
              backgroundColor: '#fff',
              shadowOpacity: 1,
              width: width * 0.96,
              alignSelf: 'center',
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
                  color: '#000',
                  marginLeft: 10,
                }}>
                {this.state.order.name}
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
                  color: '#000',
                  marginLeft: 10,
                }}>
                {this.state.order.mobile}
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
                  color: '#000',
                  marginLeft: 10,
                }}>
                {this.state.order.people} Members
              </Text>
            </View>
          </View>
          <Ripple
            rippleColor="#d20000"
            style={{
              width: width * 0.95,
              marginTop: 20,
              marginBottom: 10,
              borderRadius: 12,
              borderWidth: 1.5,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#d20000',
              elevation: 4,
              backgroundColor: '#fff',
              shadowColor: '#00000029',
              shadowOffset: {height: 5, width: 1},
              shadowRadius: 10,
              shadowOpacity: 1,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                color: '#d20000',
                margin: 15,
              }}>
              Cancel Reservation
            </Text>
          </Ripple>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {updateUpcomingReservation})(
  UpcomingDetails,
);
