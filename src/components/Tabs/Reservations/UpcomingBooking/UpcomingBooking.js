//299e49 colour code for reno pay

import React, { Component } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import Ripple from "react-native-material-ripple";
import _ from "lodash";
import { height, width } from "../../../../constants";
import Feather from "react-native-vector-icons/Feather";

class UpcomingBooking extends Component {
  render() {
    if (!_.isEmpty(this.props.data)) {
      return (
        <FlatList
          ListFooterComponent={<View style={{ marginBottom: 100 }} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("UpcomingDetailsScreen", {
                    data: item
                  })
                }
                activeOpacity={0.5}
                style={{
                  width: "100%",
                  elevation: 2,
                  shadowOpacity: 0.2,
                  borderRadius: 10,
                  shadowColor: "#00000029",
                  backgroundColor: "#fff",
                  marginTop: 15
                }}
              >
                <View
                  style={{
                    margin: 10,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      color: "#000",
                      fontSize: 17
                    }}
                  >
                    {new Date(item.date).toDateString()}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      color: "#000",
                      fontSize: 17
                    }}
                  >
                    {item.timeDiscount.time}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 15,
                    flexDirection: "row"
                  }}
                >
                  <Image
                    source={{ uri: item.restaurants.imageurl }}
                    style={{ height: 110, width: 110, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                  <View style={{ marginLeft: 6 }}>
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 18,
                        marginRight: 15,
                        color: "#000"
                      }}
                    >
                      {item.restaurants.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 14,
                        color: "#7a7a7a"
                      }}
                    >
                      {item.restaurants.city}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          fontSize: 14,
                          color: "#000"
                        }}
                      >
                        Discount Availed
                      </Text>
                      <View
                        style={{
                          width: 40,
                          height: 35,
                          backgroundColor: "#fff",
                          marginLeft: 15,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: "#d20000",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: 14,
                            color: "#d20000"
                          }}
                        >
                          {item.timeDiscount.discount}%
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Ripple
                  style={{
                    width: "95%",
                    height: 50,
                    borderRadius: 5,
                    alignSelf: "center",
                    marginBottom: 15,
                    borderWidth: 0,
                    borderColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#299e49"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      color: "white",
                      fontSize: 16
                    }}
                  >
                    Pay with reno pay
                  </Text>
                </Ripple>
              </TouchableOpacity>
            );
          }}
        />
      );
    } else {
      return (
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../../../assets/no-reservations.png")}
            style={{ height: height * 0.3, width: width, marginTop: 50 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              marginTop: 20,
              fontSize: 26,
              color: "#000"
            }}
          >
            No Reservations Found
          </Text>
          <Text
            style={{
              marginTop: 8,
              color: "#777777",
              fontFamily: "Poppins-Regular",
              fontSize: 15
            }}
          >
            Reserve a table now and avail discounts on your bill
          </Text>
        </View>
      );
    }
  }
}
export default UpcomingBooking;
