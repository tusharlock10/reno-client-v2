import React, {Component} from 'react';
import {Text, View, SafeAreaView, Linking} from 'react-native';
import Image from 'react-native-fast-image';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {height, width} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';
class BookingConfirmation extends Component {
  openGoogleMaps(url) {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error(err));
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: height * 0.4, width, backgroundColor: '#E9E9E9'}}>
          <Image
            source={require('../../../assets/confirm.gif')}
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            resizeMode="cover">
            <Ionicons
              name="md-arrow-back"
              onPress={() => this.props.navigation.navigate('Home')}
              color="#000"
              size={28}
              style={{
                marginLeft: 15,
                position: 'absolute',
                top: 20,
                left: 10,
              }}
            />
            <View
              style={{
                width,
                marginTop: '10%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.6)',
                opacity: 1,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#239A00',
                  fontSize: 18,
                }}>
                Booking Confirmed
              </Text>
            </View>
          </Image>
        </View>
        <View
          style={{
            position: 'absolute',
            height: height * 0.5,
            top: height * 0.38,
            width: width * 0.91,
            borderRadius: 10,
            alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {height: 4, width: 4},
            shadowOpacity: 0.2,
            shadowRadius: 8,
          }}>
          <Text
            style={{
              marginTop: 10,
              alignSelf: 'center',
              fontFamily: 'Poppins-Regular',
              fontSize: 18,
              marginBottom: 10,
              color: '#d20000',
            }}>
            Thank you for Reservation!
          </Text>
          <View
            style={{
              flexDirection: 'row',
              margin: 15,
              justifyContent: 'space-around',
            }}>
            <Image
              source={{
                uri: this.props.navigation.state.params.data.bookingData
                  .restaurants.imageurl,
              }}
              style={{height: 120, width: 150, borderRadius: 8}}
            />
            <View style={{justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 20,
                  color: '#000',
                }}>
                {
                  this.props.navigation.state.params.data.bookingData
                    .restaurants.name
                }
              </Text>
              <Ripple
                rippleColor="#d20000"
                style={{
                  height: 45,
                  borderRadius: 5,
                  margin: 10,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#d20000',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  Linking.openURL(
                    `tel://+91${this.props.navigation.state.params.data.bookingData.restaurants.rphone[0]}`,
                  )
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
          <View
            style={{
              width: '100%',
              borderWidth: 0.5,
              borderColor: 'grey',
              marginTop: 15,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
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
                {this.props.navigation.state.params.data.bookingData.name}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#d20000',
                fontSize: 16,
                marginRight: 10,
              }}
              onPress={this.openGoogleMaps.bind(
                this,
                this.props.navigation.state.params.data.bookingData.restaurants
                  .googlemapsurl,
              )}>
              Directions
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: '29%',
                backgroundColor: '#E9E9E9',
                height: 80,
                borderRadius: 5,
                justifyContent: 'space-around',
                alignItems: 'center',
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
                  color: '#000',
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                {new Date(
                  this.props.navigation.state.params.data.bookingData.date,
                ).toDateString()}
              </Text>
            </View>
            <View
              style={{
                width: '29%',
                backgroundColor: '#E9E9E9',
                height: 80,
                borderRadius: 5,
                justifyContent: 'space-around',
                alignItems: 'center',
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
                  color: '#000',
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                {
                  this.props.navigation.state.params.data.bookingData
                    .timeDiscount.time
                }
              </Text>
            </View>
            <View
              style={{
                width: '29%',
                backgroundColor: '#E9E9E9',
                height: 80,
                borderRadius: 5,
                justifyContent: 'space-around',
                alignItems: 'center',
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
                  color: '#000',
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                {this.props.navigation.state.params.data.bookingData.people}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              borderWidth: 0.5,
              borderColor: 'grey',
              marginTop: 15,
            }}
          />
          <Ripple
            style={{
              marginTop: 15,
              alignSelf: 'center',
              width: '95%',
              height: 55,
              borderRadius: 5,
              backgroundColor: '#d20000',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
                color: '#fff',
              }}>
              Cancel Reservation
            </Text>
          </Ripple>
        </View>
      </SafeAreaView>
    );
  }
}
export default BookingConfirmation;
