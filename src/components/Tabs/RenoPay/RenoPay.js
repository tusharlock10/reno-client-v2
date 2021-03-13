import React, { Component } from "react";

import {
  View,
  Dimensions,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
  Animated
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Feather from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import _ from "lodash";
import { getMyReservations } from "../../../actions/reservations";
import { height, width } from "../../../constants";
import { connect } from "react-redux";
import Ripple from "react-native-material-ripple";

// import * as Animatable from "react-native-animatable";

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const width = Dimensions.get("window").width;

// class QrCodeCamera extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       visible: true,
//       fade: new Animated.Value(1)
//     };
//   }
//   componentDidMount() {
//     const { navigation } = this.props;
//     navigation.addListener("willFocus", () => {
//       this.setState({ visible: true });
//       // this.fade();
//     });
//   }

//   onSuccess(e) {
//     alert(e);
//   }

//   // fade() {
//   //   Animated.timing(this.state.fade, {
//   //     toValue: 0,
//   //     timing: 300
//   //   }).start(() => {
//   //     Animated.timing(this.state.fade, {
//   //       toValue: 1,
//   //       duration: 300
//   //     }).start(() => this.fade());
//   //   });
//   // }

//   makeSlideOutTranslation(translationType, fromValue) {
//     return {
//       from: {
//         [translationType]: width * -0.32
//       },
//       to: {
//         [translationType]: fromValue
//       }
//     };
//   }

//   render() {
//     return (
//       <Modal
//         visible={this.state.visible}
//         onRequestClose={() => {
//           this.setState({ visible: false });
//           this.props.navigation.navigate("Home");
//         }}
//         animated
//         animationType="slide"
//       >
//         <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
//           <View style={{ flex: 1 }}>
//             <StatusBar
//               backgroundColor="#000"
//               barStyle="light-content"
//               translucent
//             />
//             <QRCodeScanner
//               showMarker
//               onRead={this.onSuccess.bind(this)}
//               cameraStyle={{ height: SCREEN_HEIGHT }}
//               customMarker={
//                 <View style={styles.rectangleContainer}>
//                   <View
//                     style={{
//                       backgroundColor: overlayColor,
//                       width: width,
//                       flexDirection: "row",
//                       justifyContent: "space-between"
//                     }}
//                   >
//                     <AntIcon
//                       name="close"
//                       size={32}
//                       onPress={() => {
//                         this.setState({ visible: false });
//                         this.props.navigation.navigate("Home");
//                       }}
//                       color="#fff"
//                       style={{ margin: 20 }}
//                     />
//                     <Ionicons
//                       name="ios-search"
//                       size={32}
//                       onPress={() => {
//                         this.setState({ visible: false });
//                         this.props.navigation.navigate("QRSearchScreen");
//                       }}
//                       color="#fff"
//                       style={{ margin: 20 }}
//                     />
//                   </View>

//                   <View style={styles.topOverlay}>
//                     <View
//                       style={{ flexDirection: "row", alignItems: "center" }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 18,
//                           color: "white",
//                           fontFamily: "Poppins-SemiBold"
//                         }}
//                       >
//                         Scan QR code to pay
//                       </Text>
//                       <Feather
//                         name="help-circle"
//                         color="#fff"
//                         size={19}
//                         style={{ marginLeft: 7 }}
//                       />
//                     </View>
//                   </View>
//                   <View style={{ flexDirection: "row" }}>
//                     <View style={styles.leftAndRightOverlay} />
//                     <View
//                       style={styles.rectangle}
//                     >
//                       <Animatable.View
//                         style={{
//                           width: "100%",
//                           height: 1.7,
//                           backgroundColor: "#d20000",
//                         }}
//                         direction="alternate-reverse"
//                         iterationCount="infinite"
//                         duration={1400}
//                         easing="linear"
//                         animation={this.makeSlideOutTranslation(
//                           "translateY",
//                           width * 0.32
//                         )}
//                       />
//                     </View>
//                     <View style={styles.leftAndRightOverlay} />
//                   </View>
//                   <View style={styles.bottomOverlay} />
//                 </View>
//               }
//             />
//           </View>
//         </SafeAreaView>
//       </Modal>
//     );
//   }
// }

// const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

// const rectDimensions = width * 0.65; // this is equivalent to 255 from a 393 device width
// const rectBorderWidth = width * 0.005; // this is equivalent to 2 from a 393 device width
// const rectBorderColor = "transparent";

// const scanBarWidth = width * 0.46; // this is equivalent to 180 from a 393 device width
// const scanBarHeight = width * 0.0025; //this is equivalent to 1 from a 393 device width
// const scanBarColor = "#d20000";

// const iconScanColor = "#d20000";

// const styles = {
//   rectangleContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "transparent"
//   },

//   rectangle: {
//     height: rectDimensions,
//     width: rectDimensions,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "transparent"
//   },

//   topOverlay: {
//     flex: 1,
//     height: width,
//     width: width,
//     backgroundColor: overlayColor,
//     justifyContent: "center",
//     alignItems: "center"
//   },

//   bottomOverlay: {
//     flex: 1,
//     height: width,
//     width: width,
//     backgroundColor: overlayColor,
//     paddingBottom: width * 0.25
//   },

//   leftAndRightOverlay: {
//     height: width * 0.65,
//     width: width,
//     backgroundColor: overlayColor
//   },

//   scanBar: {
//     width: scanBarWidth,
//     height: scanBarHeight,
//     backgroundColor: scanBarColor
//   }
// };

class QRCodeScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.props.getMyReservations();
    });
  }
  render() {
    return (
      <View style={{ backgroundColor: "#fff", alignItems: "center" }}>
        <Image
          source={require("../../../../assets/ScanSoon.jpeg")}
          style={{ height: height * 0.4, width: "100%" }}
          resizeMode="contain"
        />
        <View
          style={{
            width: width * 0.4,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d20000",
            borderRadius: 15
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 16,
              color: "#fff"
            }}
          >
            Coming Soon
          </Text>
        </View>
        <Text
          style={{
            margin: 20,
            fontFamily: "Poppins-Regular",
            color: "#707070",
            fontSize: 14
          }}
        >
          Scan And Pay feature for Reno Pay is coming soon. You can search pay
          for the restaurants accepting
          <Text style={{ color: "#299e49", fontFamily: "Poppins-Medium" }}>
            {" "}
            Reno Pay.
          </Text>
        </Text>
        <Ripple
          style={{
            width: width * 0.9,
            height: 55,
            backgroundColor: "#d20000",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6
          }}
          onPress={() => this.props.navigation.navigate("QRSearchScreen")}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 18,
              color: "#fff"
            }}
          >
            Search For Restaurants
          </Text>
        </Ripple>
        {this.props.reservations.orders ? (
          !_.isEmpty(this.props.reservations.orders.upcomingOrders) ? (
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#707070",
                  fontSize: 13,
                  marginTop: 20,
                  marginBottom: 10
                }}
              >
                UPCOMING BOOKING
              </Text>
              <Ripple
                style={{
                  width: width * 0.9,
                  height: 100,
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  alignItems: "center",
                  borderRadius: 6,
                  shadowOpacity: 0.25,
                  shadowColor: "#000",
                  shadowOffset: { height: 2, width: 2 },
                  shadowRadius: 7,
                  elevation: 7
                }}
                onPress={() =>
                  this.props.navigation.navigate("EnterAmountScreen", {
                    imageurl: this.props.reservations.orders.data
                      .upcomingOrders[0].restaurants.imageurl,
                    name: this.props.reservations.orders.data.upcomingOrders[0]
                      .restaurants.name,
                    city: this.props.reservations.orders.data.upcomingOrders[0]
                      .restaurants.city
                  })
                }
              >
                <Image
                  source={{
                    uri: this.props.reservations.orders.data.upcomingOrders[0]
                      .restaurants.imageurl
                  }}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 5,
                    marginLeft: 12
                  }}
                />
                <View style={{ margin: 10, justifyContent: "space-between" }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      color: "#000",
                      fontSize: 16
                    }}
                  >
                    {
                      this.props.reservations.orders.data.upcomingOrders[0]
                        .restaurants.name
                    }
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      color: "#d20000",
                      fontSize: 16
                    }}
                  >
                    {
                      this.props.reservations.orders.data.upcomingOrders[0]
                        .timeDiscount.time
                    }
                  </Text>
                </View>
              </Ripple>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 14,
                  color: "#000",
                  marginTop: 10
                }}
              >
                click on the above card to make payement
              </Text>
            </View>
          ) : (
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: "#707070",
                fontSize: 16,
                marginTop: 20,
                marginBottom: 10
              }}
            >
              No Upcoming Bookings
            </Text>
          )
        ) : (
          <View
            style={{
              width,
              height: 55,
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator color="#d20000" size="small" />
          </View>
        )}
      </View>
    );
  }
}

mapStateToProps = state => {
  return { reservations: state.reservations };
};

export default connect(mapStateToProps, { getMyReservations })(QRCodeScreen);
