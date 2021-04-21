import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import Image from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import _ from 'lodash';
import {height, width} from '../../../../constants';
class PastBooking extends Component {
  render() {
    if (!_.isEmpty(this.props.data)) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{marginBottom: 100}} />}
          data={this.props.data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            if (!item.restaurants) {
              return null;
            }
            return (
              <Ripple
                style={{
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  shadowColor: '#00000029',
                  elevation: 7,
                  shadowOpacity: 0.2,
                  marginTop: 15,
                  marginHorizontal: 10,
                }}
                onPress={() =>
                  this.props.navigation.navigate('PastDetails', {
                    data: item,
                  })
                }>
                <View
                  style={{
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000',
                      fontSize: 17,
                    }}>
                    {new Date(item.date).toDateString()}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000',
                      fontSize: 17,
                    }}>
                    {item.timeDiscount.time}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 15,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={{uri: item.restaurants.imageurl}}
                    style={{height: 110, width: 110, borderRadius: 10}}
                    resizeMode="cover"
                  />
                  <View style={{marginLeft: 6}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 18,
                        marginRight: 15,
                        color: '#000',
                      }}>
                      {item.restaurants.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#7a7a7a',
                      }}>
                      {item.restaurants.city}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
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
                          {item.timeDiscount.discount}%
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    marginBottom: 15,
                  }}>
                  {item.cancelled ? (
                    <Text
                      style={{
                        color: '#d20000',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {'Reservation Cancelled'}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: item.unlockActive ? 'green' : '#d20000',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {item.unlockActive
                        ? 'Deal Unlocked'
                        : 'Deal Not Unlocked'}
                    </Text>
                  )}
                </View>
              </Ripple>
            );
          }}
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
export default PastBooking;
