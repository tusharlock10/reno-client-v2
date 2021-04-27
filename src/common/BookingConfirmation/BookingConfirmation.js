import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  Linking,
  Alert,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Image from 'react-native-fast-image';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {height, width} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';
import {cancelOrder} from '../../actions/reservations';
class BookingConfirmation extends Component {
  state = {cancelLoading: false, cancelled: false};

  onBackPress = () => {
    this.props.navigation.navigate('Home');
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  openGoogleMaps(url) {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error(err));
  }

  renderHeader() {
    return (
      <Image
        source={require('../../../assets/confirm.gif')}
        style={{height: height * 0.3, width}}
        resizeMode="cover">
        <View
          style={{
            width,
            paddingHorizontal: 20,
            paddingVertical: 15,
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.6)',
            flexDirection: 'row',
          }}>
          <Ionicons
            name="md-arrow-back"
            onPress={() => this.props.navigation.navigate('Home')}
            size={28}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#239A00',
              fontSize: 18,
              marginLeft: 10,
            }}>
            Booking Confirmed
          </Text>
        </View>
      </Image>
    );
  }

  renderRestaurantDetails() {
    const {restaurants} = this.props.route.params.data.bookingData;
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          justifyContent: 'space-around',
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={{uri: restaurants.imageurl}}
            style={{
              height: ((width / 2 - 30) * 3) / 4,
              width: width / 2 - 30,
              borderRadius: 8,
              elevation: 5,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 20,
              color: '#000',
            }}>
            {restaurants.name}
          </Text>
          <Ripple
            rippleColor="#d20000"
            style={{
              borderRadius: 6,
              padding: 7,
              margin: 10,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#d20000',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}
            onPress={() =>
              Linking.openURL(`tel://+91${restaurants.rphone[0]}`)
            }>
            <Foundation name="telephone" size={18} color="#d20000" />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginLeft: 6,
                color: '#d20000',
              }}>
              Contact
            </Text>
          </Ripple>
        </View>
      </View>
    );
  }

  confirmCancelOrder() {
    if (this.state.cancelLoading || this.state.cancelled) return;

    const orderId = this.props.route.params.data.bookingData.id;
    Alert.alert('Cancel Booking', 'You are about to cancel this booking.', [
      {text: 'Back', onPress: () => {}},
      {
        text: 'Cancel',
        onPress: () => {
          this.setState({cancelLoading: true});
          this.props.cancelOrder(orderId, () => {
            this.setState({cancelLoading: false, cancelled: true});
          });
        },
      },
    ]);
  }

  renderCancelBooking() {
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: '#fff',
          elevation: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {this.state.cancelLoading ? (
          <View
            style={{
              flex: 1,
              marginRight: 10,
              padding: 10,
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#d20000'} />
          </View>
        ) : this.state.cancelled ? (
          <View
            style={{
              flex: 1,
              marginRight: 10,
              padding: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
                color: '#d20000',
              }}>
              Booking Cancelled
            </Text>
          </View>
        ) : (
          <Ripple
            onPress={this.confirmCancelOrder.bind(this)}
            style={{
              flex: 1,
              marginRight: 10,
              padding: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
                color: '#d20000',
              }}>
              Cancel Booking
            </Text>
          </Ripple>
        )}
        <Ripple
          onPress={() => this.props.navigation.navigate('Home')}
          style={{
            flex: 1,
            borderRadius: 5,
            backgroundColor: '#239A00',
            padding: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
              color: '#fff',
            }}>
            Done
          </Text>
        </Ripple>
      </View>
    );
  }

  renderBookingDetails() {
    const {
      restaurants,
      name,
      date,
      timeDiscount,
      people,
    } = this.props.route.params.data.bookingData;
    return (
      <>
        <View
          style={{
            width: '100%',
            borderWidth: 0.6,
            borderColor: 'lightgrey',
            marginTop: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 15,
              alignItems: 'center',
            }}>
            <FontAwesome5 name="user" color="#000" size={18} />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
              }}>
              {name}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#d20000',
              fontSize: 16,
              marginRight: 10,
            }}
            onPress={this.openGoogleMaps.bind(this, restaurants.googlemapsurl)}>
            Directions
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: 5,
              width: width * 0.25,
              justifyContent: 'space-around',
              alignItems: 'center',
              elevation: 5,
            }}>
            <Text
              style={{
                color: '#D20000',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              DAY
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#202020',
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
              }}>
              {new Date(date).toDateString()}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: 5,
              width: width * 0.25,
              justifyContent: 'space-around',
              alignItems: 'center',
              elevation: 5,
            }}>
            <Text
              style={{
                color: '#D20000',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              TIME
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#202020',
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
              }}>
              {timeDiscount.time}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: 5,
              width: width * 0.25,
              justifyContent: 'space-around',
              alignItems: 'center',
              elevation: 5,
            }}>
            <Text
              style={{
                color: '#D20000',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              PEOPLE
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#202020',
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
              }}>
              {people}
            </Text>
          </View>
        </View>
      </>
    );
  }

  render() {
    return (
      <>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: '#fff',
          }}>
          {this.renderHeader()}
          <View>
            <Text
              style={{
                marginTop: 10,
                alignSelf: 'center',
                fontFamily: 'Poppins-Regular',
                fontSize: 18,
                marginBottom: 10,
                color: '#d20000',
              }}>
              Thank you for reservation!
            </Text>
            {this.renderRestaurantDetails()}
            {this.renderBookingDetails()}
          </View>
          <View style={{height: 100}} />
        </ScrollView>
        {this.renderCancelBooking()}
      </>
    );
  }
}
export default connect(null, {cancelOrder})(BookingConfirmation);
