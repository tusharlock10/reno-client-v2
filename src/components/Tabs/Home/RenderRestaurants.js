import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Image from 'react-native-fast-image';
import {Svg, Polygon} from 'react-native-svg';
import {height, width} from '../../../constants';
import RenderSlots from './RenderSlots';
import {getDayFromNumber} from '../../../utils/dateTimeUtils';

class RenderRestaurants extends Component {
  constructor(props) {
    super(props);
    this.day =
      getDayFromNumber(new Date().getDay()).substring(0, 3) + 'Discount';
    this.exhaust =
      getDayFromNumber(new Date().getDay()).substring(0, 3) + 'Exhaust';
  }
  render() {
    return (
      <View style={{width: width, alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={1}
          rippleDuration={300}
          onPress={() =>
            this.props.navigation.navigate('CreateOrders', {
              timeDiscounts: this.props.timeDiscounts,
              imageUri: this.props.image,
              id: this.props.id,
              directions: this.props.directions,
              name: this.props.name,
              city: this.props.city,
            })
          }
          style={{
            width: width * 0.9,
            alignSelf: 'center',
            marginBottom: 20,
            borderRadius: 15,
            backgroundColor: '#fff',
            height: 305,
            elevation: 7,
            shadowColor: '#000',
            shadowOffset: {height: 3, width: 0},
            shadowOpacity: 0.2,
          }}>
          <Image
            source={{uri: this.props.image}}
            style={{
              height: 220,
              width: '100%',
              borderTopRightRadius: 20,
              overflow: 'hidden',
              borderTopLeftRadius: 20,
            }}
            resizeMode="cover">
            <Svg height="220" width={'100%'}>
              <Polygon points={`0,140 0,220 ${width * 0.94},220`} fill="#fff" />
            </Svg>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                position: 'absolute',
                top: 175,
                left: 10,
                fontSize: 14,
                color: '#7a7a7a',
              }}>
              {this.props.city}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                position: 'absolute',
                top: 195,
                left: 10,
                fontSize: 18,
                color: '#000',
              }}>
              {this.props.name}
            </Text>
          </Image>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{marginLeft: 10, marginRight: 10, marginBottom: 3}}
            data={this.props.timeDiscounts}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({item}) => {
              let exhausted = item[this.exhaust];
              return (
                <RenderSlots
                  exhausted={exhausted}
                  image={this.props.image}
                  discount={item[this.day]}
                  time={item.time}
                  id={this.props.id}
                  timeDiscountId={item.id}
                  city={this.props.city}
                  name={this.props.name}
                  timeDiscounts={this.props.timeDiscounts}
                  navigation={this.props.navigation}
                  directions={this.props.directions}
                />
              );
            }}
          />
        </TouchableOpacity>

        <View style={{position: 'absolute', left: 7, top: 15}}>
          <View
            style={{
              justifyContent: 'center',
              elevation: 9,
              backgroundColor: this.props.isRenoPayEnabled
                ? '#299e49'
                : '#d29034',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              borderTopLeftRadius: 5,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontFamily: 'Poppins-SemiBold',
              }}>
              {this.props.isRenoPayEnabled ? 'Reno Pay' : 'Pay at Restaurant'}
            </Text>
          </View>
          <View
            style={{
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderStyle: 'solid',
              top: 16,
              left: 4.4,
              borderLeftWidth: 8,
              position: 'absolute',
              borderRightWidth: 8,
              borderBottomWidth: 16,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: this.props.isRenoPayEnabled
                ? '#258f42'
                : '#be8228',
              transform: [{rotate: '45deg'}],
            }}
          />
        </View>

        {this.props.hasPickup ? (
          <View style={{position: 'absolute', right: 7, top: 15}}>
            <View
              style={{
                justifyContent: 'center',
                elevation: 9,
                backgroundColor: this.props.isRenoPayEnabled
                  ? '#299e49'
                  : '#d29034',
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Pickup/Takeaway
              </Text>
            </View>
            <View
              style={{
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                top: 16,
                right: 4.4,
                borderLeftWidth: 8,
                position: 'absolute',
                borderRightWidth: 8,
                borderBottomWidth: 16,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: this.props.isRenoPayEnabled
                  ? '#258f42'
                  : '#be8228',
                transform: [{rotate: '-45deg'}],
              }}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
export default RenderRestaurants;
