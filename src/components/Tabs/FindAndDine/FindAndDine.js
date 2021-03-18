import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import _ from 'lodash';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AnimatedPriceMarker from './RestaurantMarker';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {getNearbyRestaurants} from '../../../actions/nearby';
import NearbyRestaurants from './NearbyRestaurants';
import {ActivityIndicator} from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import {getPermission} from '../../../utils/permissions';

class FindAndDine extends Component {
  state = {
    data: null,
    maxDistance: 1000, // in km
  };

  componentDidMount() {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    if (!getPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
      return null;
    }

    const city = await AsyncStorage.getItem('city');

    Geolocation.getCurrentPosition(
      (position) => {
        this.props.getNearbyRestaurants({...position.coords, city});
      },
      (error) => console.error(error),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  }

  render() {
    if (this.props.nearby.restaurants) {
      return (
        <View style={{flex: 1}}>
          <MapView
            ref={(map) => {
              this.map = map;
            }}
            initialRegion={{
              latitude: this.props.nearby.latitude,
              longitude: this.props.nearby.longitude,
              latitudeDelta: 0.5,
              longitudeDelta: 0.4,
            }}
            provider={PROVIDER_GOOGLE}
            mapType="standard"
            style={{flex: 1}}>
            <Marker
              coordinate={{
                latitude: this.props.nearby.latitude,
                longitude: this.props.nearby.longitude,
              }}
              title={'Your Location'}
            />
            {this.props.nearby.restaurants != null ? (
              this.props.nearby.restaurants.map((marker) => {
                if (marker.distance > this.state.maxDistance) {
                  return null;
                }
                return (
                  <Marker
                    key={marker.id}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    key={marker.id}
                    title={marker.name}
                    description={marker.state}
                    onPress={() => {
                      this.map.animateToRegion({
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                      });
                      this.setState({
                        data: marker,
                        longitude: marker.longitude,
                        latitude: marker.latitude,
                      });
                    }}>
                    <AnimatedPriceMarker
                      discount={marker.timeDiscounts[0]?.discount || '0'}
                    />
                  </Marker>
                );
              })
            ) : (
              <View />
            )}
          </MapView>
          {this.state.data ? (
            <View
              style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
              <NearbyRestaurants
                navigation={this.props.navigation}
                data={this.state.data}
              />
            </View>
          ) : (
            <View />
          )}

          <Ripple
            style={[styles.bubble, styles.button]}
            onPress={() => this.getCurrentPosition()}>
            <Entypo name="location-pin" color="#d20000" size={16} />
            <Text
              style={{
                color: '#d20000',
                fontFamily: 'Poppins',
                marginLeft: 5,
                fontSize: 14,
              }}>
              Refresh Location
            </Text>
          </Ripple>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} color="#d20000" size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  bubble: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 15,
    left: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});

mapStateToProps = (state) => {
  return {nearby: state.nearby};
};

export default connect(mapStateToProps, {getNearbyRestaurants})(FindAndDine);
