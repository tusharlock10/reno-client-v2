import React, {Component} from 'react';
import {Text, View, SafeAreaView, Linking} from 'react-native';
import Image from 'react-native-fast-image';
import {width, height} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
class AboutUs extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            width,
            height: 55,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Ionicons
            name="md-arrow-back"
            onPress={() => this.props.navigation.goBack()}
            color="#000"
            size={28}
            style={{marginLeft: 15}}
          />
          <Text
            style={{
              marginLeft: 20,
              fontFamily: 'Poppins-Medium',
              color: '#000',
              fontSize: 25,
            }}>
            About Us
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{marginTop: height * 0.1, alignItems: 'center'}}>
            <Image
              source={require('../../../assets/reno_logo_main.png')}
              style={{height: 130, width: 130}}
              resizeMode="cover"
            />
            <Text
              style={{
                fontFamily: 'Ubuntu-Bold',
                marginTop: 6,
                fontSize: 37,
                color: '#d20000',
              }}>
              reno
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: '#000',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
              }}
              onPress={() =>
                Linking.openURL('https://goreno.in/').catch((err) =>
                  console.error(err),
                )
              }>
              www.goreno.in
            </Text>
            <Text
              style={{
                margin: 10,
                marginTop: 40,
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 16,
              }}>
              Founded in 2018 India's first, Reno's mission is to connect empty
              tables to empty mouths by offering real time discounts on a 30 min
              slot basis with discounts of up to 50% every day at all of its
              participating restaurants, bars, and cafes through its mobile app.
              Users can choose to dine anywhere, from upscale hotels to popular
              food chains, and enjoy the same discounts with no strings
              attached, while restaurants get to fill their un-utilised capacity
              during off-peak hours. The best of the best part, it's free to
              use.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default AboutUs;
