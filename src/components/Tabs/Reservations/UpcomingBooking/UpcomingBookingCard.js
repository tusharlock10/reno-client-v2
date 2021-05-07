import React from 'react';
import _ from 'lodash';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Image from 'react-native-fast-image';
import {
  isCurrentTimeInRange,
  getDayFromNumber,
} from '../../../../utils/dateTimeUtils';

class UpcomingBookingCard extends React.Component {
  renderUnlockButton() {
    const {infoOnly, item} = this.props;
    if (infoOnly) {
      return null;
    }

    if (!item.restaurants.acceptsRenoPay) {
      return null;
    }

    const canUnlockTheDeal = isCurrentTimeInRange(item.timeDiscount.time);

    return (
      <Ripple
        onPress={() => {
          if (item.unlockActive) {
            this.props.navigation.navigate('EnterAmountScreen', {
              data: item,
            });
          } else if (canUnlockTheDeal) {
            this.props.unlockDeal(item.id);
          }
        }}
        style={{
          flex: 1,
          marginHorizontal: 10,
          marginTop: 5,
          marginBottom: 10,
          elevation: 7,
          borderRadius: 5,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: item.unlockActive
            ? '#299e49'
            : canUnlockTheDeal
            ? '#D20000'
            : '#7a7a7a',
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: 'white',
            fontSize: 16,
          }}>
          {item.unlockActive ? 'Pay with Reno Pay' : 'Unlock your visit'}
        </Text>
      </Ripple>
    );
  }

  render() {
    const {item, index, infoOnly} = this.props;
    const discountProperty =
      getDayFromNumber(new Date(item.date).getDay()).substring(0, 3) +
      'Discount';

    if (!item.restaurants) {
      return null;
    }
    return (
      <Pressable
        style={styles.cardStyle}
        android_ripple={{color: '#dcdcdc'}}
        onPress={() => {
          if (!infoOnly) {
            this.props.navigation.navigate('UpcomingDetails', {index});
          }
        }}>
        <View style={styles.dateView}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#000',
              fontSize: 16,
            }}>
            {new Date(item.date).toDateString()}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#000',
              fontSize: 14,
            }}>
            {item.timeDiscount.time}
          </Text>
        </View>
        <View style={{flexDirection: 'row', padding: 10, paddingTop: 0}}>
          <Image
            source={{uri: item.restaurants.imageurl}}
            style={{
              height: 128,
              width: 128,
              borderRadius: 7.5,
              elevation: 5,
            }}
            resizeMode="cover"
          />
          <View style={{marginLeft: 15}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 18,
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
                  backgroundColor: '#fff',
                  marginLeft: 15,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#d20000',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    color: '#d20000',
                  }}>
                  {item.timeDiscount[discountProperty]}%
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#707070',
              }}>
              {item.restaurants.acceptsRenoPay
                ? 'Pay with Reno Pay'
                : 'Pay at Restaurant'}
            </Text>
          </View>
        </View>

        {this.renderUnlockButton()}
      </Pressable>
    );
  }
}

export default UpcomingBookingCard;

const styles = StyleSheet.create({
  cardStyle: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 5,
    marginTop: 15,
    marginHorizontal: 10,
  },
  dateView: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
