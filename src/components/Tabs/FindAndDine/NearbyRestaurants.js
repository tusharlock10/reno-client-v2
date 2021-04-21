import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import {Svg, Polygon} from 'react-native-svg';
import Ripple from 'react-native-material-ripple';
import {height, width} from '../../../constants';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
class RenderRestaurants extends Component {
  render() {
    return (
      <View
        rippleDuration={300}
        style={{
          width: width * 0.94,
          height: 100,
          marginBottom: 20,
          borderRadius: 8,
          backgroundColor: '#fff',
          height: 150,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: {height: 3, width: 0},
          shadowOpacity: 0.2,
          elevation: 4,
        }}>
        <Image
          source={{uri: this.props.data.imageurl}}
          style={{
            height: 150,
            width: 150,
            overflow: 'hidden',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
          resizeMode="cover">
          <View
            style={{
              width: 35,
              height: 38,
              marginRight: 20,
              backgroundColor: '#fff',
              opacity: 0.9,
              alignSelf: 'flex-end',
              borderBottomLeftRadius: 7,
              borderBottomRightRadius: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 18,
                color: '#000',
              }}>
              {this.props.data.rating}
            </Text>
          </View>
        </Image>
        <View
          style={{
            marginLeft: 15,
            marginTop: 10,
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
              color: '#000',
            }}>
            {this.props.data.name}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              color: '#7a7a7a',
            }}>
            {this.props.data.city}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <SimpleLineIcons name="location-pin" color="#7a7a7a" size={15} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  paddingLeft: 5,
                }}>
                {this.props.data.distance.toFixed(2)} km
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="md-time" color="#7a7a7a" size={18} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  paddingLeft: 5,
                }}>
                {(this.props.data.duration * 60).toString().slice(0, 4)} min
              </Text>
            </View>
          </View>
          <Ripple
            rippleColor="#d20000"
            onPress={() =>
              this.props.navigation.navigate('CreateOrders', {
                timeDiscounts: this.props.data.timeDiscounts,
                imageUri: this.props.data.imageurl,
                directions: this.props.data.directions,
                name: this.props.data.name,
                city: this.props.data.city,
                id: this.props.data.id,
              })
            }
            style={{
              width: '90%',
              height: 45,
              backgroundColor: '#fff',
              marginTop: 5,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#d20000',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold',
                color: '#d20000',
              }}>
              Book Now
            </Text>
          </Ripple>
        </View>
      </View>
    );
  }
}
export default RenderRestaurants;
