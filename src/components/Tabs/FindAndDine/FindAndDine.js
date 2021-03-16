import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
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
import {width} from '../../../constants';
import Ripple from 'react-native-material-ripple';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';

class FindAndDine extends Component {
  state = {
    data: '',
    maxDistance: 1000, // in km
  };

  componentDidMount() {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!hasPermission) {
        const reqPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (reqPermission !== PermissionsAndroid.RESULTS.GRANTED) {
          return null;
        }
      }
    } else {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result === 'denied' || result === 'disabled') {
        return null;
      }
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
                if (!_.isEmpty(marker.timeDiscounts)) {
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
                        discount={marker.timeDiscounts[0].discount}
                      />
                    </Marker>
                  );
                } else return <View />;
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
                image={this.state.data.imageurl}
                timeDiscounts={this.state.data.timeDiscounts}
                imageurl={this.state.data.imageurl}
                name={this.state.data.name}
                directions={this.state.data.googlemapsurl}
                city={this.state.data.state}
                rating={this.state.data.rating}
                distance={this.state.data.distance}
                duration={this.state.data.duration}
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
