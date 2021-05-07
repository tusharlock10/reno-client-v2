import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {width} from '../../constants';
import Ripple from 'react-native-material-ripple';
class Footer extends Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#fff',
          shadowColor: '#00000029',
          shadowOpacity: 1,
          shadowOffset: {height: -5, width: 0},
          height: 80,
          elevation: 15,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <Ripple
          onPress={async () =>
            this.props.confirmBooking(
              this.props.data,
              (data) => {
                this.props.navigation.navigate('BookingConfirmation', {data});
              },
              () => this.props.showSnackbar(true),
            )
          }
          style={{
            width: '90%',
            height: 55,
            backgroundColor: this.props.active ? '#d20000' : '#00000059',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              color: '#fff',
            }}>
            VERIFY
          </Text>
        </Ripple>
      </View>
    );
  }
}
export default Footer;
