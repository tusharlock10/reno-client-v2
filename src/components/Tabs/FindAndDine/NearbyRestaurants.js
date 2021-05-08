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
        style={{
          marginBottom: 70,
          width: width * 0.9,
          backgroundColor: '#fff',
          elevation: 7,
          borderRadius: 10,
          overflow: 'hidden',
          flexDirection: 'row',
        }}>
        <Image
          source={{uri: this.props.data.imageurl}}
          style={{
            width: 150,
            overflow: 'hidden',
          }}>
          <View
            style={{
              marginRight: 20,
              paddingHorizontal: 5,
              backgroundColor: '#fff',
              opacity: 0.8,
              paddingVertical: 5,
              alignSelf: 'flex-end',
              borderBottomLeftRadius: 7,
              borderBottomRightRadius: 7,
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
            flex: 1,
            padding: 5,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              color: '#000',
              textAlign: 'justify',
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
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <SimpleLineIcons name="location-pin" color="#7a7a7a" size={15} />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                  paddingLeft: 5,
                }}>
                {this.props.data.distance.toFixed(1)} km
              </Text>
            </View>
            <View
              style={{
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="md-time" color="#7a7a7a" size={18} />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                  color: '#000',
                }}>
                {(this.props.data.duration * 60).toString().slice(0, 3)} min
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
              backgroundColor: '#fff',
              marginTop: 5,
              borderRadius: 7.5,
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#d20000',
              paddingVertical: 5,
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
