import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  // ActivityIndicator,
  TouchableHighlight
} from "react-native";
import _ from "lodash";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE
} from "react-native-maps";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import AnimatedPriceMarker from "./RestaurantMarker";
import Entypo from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import { getNearbyRestaurants } from "../../../actions/nearby";
import NearbyRestaurants from "./NearbyRestaurants";
import { ActivityIndicator } from "react-native-paper";
import { width } from "../../../constants";
import Ripple from "react-native-material-ripple";
class FindAndDine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
  }

  componentDidMount() {
    this.getCurrentPosition();
    
  }

  getCurrentPosition() {
    const { getNearbyRestaurants } = this.props;
    if (Platform.OS == "android") {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: false, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
        preventBackClick: true, // true => To prevent the location services popup from closing when it is clicked back button
        providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
      }).then(function(success) {
        let location = navigator.geolocation.getCurrentPosition(
          position => {
            getNearbyRestaurants(
              position.coords.longitude,
              position.coords.latitude
            );
          },
          error => {
            console.error(error);
            Alert.alert(
              "Location Error",
              "Cannot fetch the location at the moment!!",
              [{ text: "OK", onPress: () => null }],
              { cancelable: false }
            );
          },
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
      });
    } else {
      let location = navigator.geolocation.getCurrentPosition(
        position => {
          getNearbyRestaurants(
            position.coords.longitude,
            position.coords.latitude
          );
        },
        error => {
          console.error(error);
          Alert.alert(
            "Location Error",
            "Cannot fetch the location at the moment!!",
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  render() {
    if (this.props.nearby.restaurants) {
      return (
        <View style={{ flex: 1 }}>
          <MapView
            ref={map => {
              this.map = map;
            }}
            initialRegion={{
              latitude: this.props.nearby.latitude,
              longitude: this.props.nearby.longitude,
              latitudeDelta: 0.5,
              longitudeDelta: 0.4
            }}
            provider={PROVIDER_DEFAULT}
            mapType="standard"
            style={{ flex: 1 }}
          >
            <Marker
              coordinate={{
                latitude: this.props.nearby.latitude,
                longitude: this.props.nearby.longitude
              }}
              title={"Your Location"}
            />
            {this.props.nearby.restaurants != null ? (
              this.props.nearby.restaurants.data.map(marker => {
                if (!_.isEmpty(marker.timeDiscounts)) {
                  return (
                    <Marker
                      key={marker.id}
                      coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude
                      }}
                      key={marker.id}
                      title={marker.name}
                      description={marker.state}
                      onPress={() => {
                        this.map.animateToRegion({
                          latitude: marker.latitude,
                          longitude: marker.longitude,
                          latitudeDelta: 0,
                          longitudeDelta: 0
                        });
                        this.setState({
                          data: marker,
                          longitude: marker.longitude,
                          latitude: marker.latitude
                        });
                      }}
                    >
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
              style={{ position: "absolute", bottom: 0, alignSelf: "center" }}
            >
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
              alignSelf: "center",
              height: 40,
              backgroundColor: "transparent",
              position: "absolute",
              shadowColor: "#000",
              shadowOffset: { height: 1, width: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 7,
              top: 44
            }}
          >
            <Ripple
              style={[styles.bubble, styles.button]}
              onPress={() => this.getCurrentPosition()}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Entypo name="location-pin" color="#d20000" size={20} />
                <Text
                  style={{
                    color: "#d20000",
                    fontFamily: "Poppins-SemiBold",
                    marginLeft: 5
                  }}
                >
                  Refresh my location
                </Text>
              </View>
            </Ripple>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating={true} color="#d20000" size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255,0.8)",
    borderRadius: 20
  },
  button: {
    justifyContent: "center",
    alignItems: "center"
  }
});

mapStateToProps = state => {
  return { nearby: state.nearby };
};

export default connect(mapStateToProps, { getNearbyRestaurants })(FindAndDine);
