import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import _ from 'lodash';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import AnimatedPriceMarker from './RestaurantMarker';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {getNearbyRestaurants} from '../../../actions/nearby';
import NearbyRestaurants from './NearbyRestaurants';
import {ActivityIndicator} from 'react-native-paper';
import {width} from '../../../constants';
import Ripple from 'react-native-material-ripple';
import Geolocation from 'react-native-geolocation-service';

class FindAndDine extends Component {
  state = {
    data: '',
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
        console.log({hasPermission});
        const reqPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (reqPermission !== PermissionsAndroid.RESULTS.granted) {
          return null;
        }
      }
    } else {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result === 'denied' || result === 'disabled') {
        return null;
      }
    }

    Geolocation.getCurrentPosition(
      (position) => {
        this.props.getNearbyRestaurants(
          position.coords.longitude, // 28.6187961,
          position.coords.latitude, // 77.21920639999999,
        );
      },
      (error) => console.error(error),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  }

  render() {
    console.log('PROPS IN NEARBY : ', this.props);
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
            provider={PROVIDER_DEFAULT}
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
              this.props.nearby.restaurants.data.map((marker) => {
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
          <View
            style={{
              width: width * 0.5,
              alignSelf: 'center',
              height: 40,
              backgroundColor: 'transparent',
              position: 'absolute',
              shadowColor: '#000',
              shadowOffset: {height: 1, width: 1},
              shadowOpacity: 0.3,
              shadowRadius: 7,
              top: 44,
            }}>
            <Ripple
              style={[styles.bubble, styles.button]}
              onPress={() => this.getCurrentPosition()}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo name="location-pin" color="#d20000" size={20} />
                <Text
                  style={{
                    color: '#d20000',
                    fontFamily: 'Poppins-SemiBold',
                    marginLeft: 5,
                  }}>
                  Refresh my location
                </Text>
              </View>
            </Ripple>
          </View>
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
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    borderRadius: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

mapStateToProps = (state) => {
  return {nearby: state.nearby};
};

export default connect(mapStateToProps, {getNearbyRestaurants})(FindAndDine);
