import React, { Component } from "react";
import { Text, View, ImageBackground, SafeAreaView } from "react-native";
import { height, width } from "../../../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import Ripple from "react-native-material-ripple";
import Feather from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";

class PastDetails extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View style={{ backgroundColor: "#F8F8F8", flex: 1 }}>
        <ImageBackground
          source={{ uri: data.restaurants.imageurl }}
          style={{
            height: height * 0.25,
            marginBottom: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            width
          }}
          resizeMode="cover"
        >
          <Ionicons
            name="md-arrow-back"
            onPress={() => this.props.navigation.pop()}
            color="#fff"
            size={35}
            style={{ marginTop: 45, marginLeft: 15 }}
          />
          <View
            style={{
              height: 38,
              width: 60,
              marginTop: 45,
              opacity: 0.8,
              //   borderTopLeftRadius: 5,
              //   borderBottomLeftRadius: 5,
              flexDirection: "row",
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 19,
                color: "#000"
              }}
            >
              4.5
            </Text>
            <Ionicons
              name="ios-star"
              color="#000"
              size={20}
              style={{ marginLeft: 5 }}
            />
          </View>
        </ImageBackground>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 25,
                textAlign: "center",
                color: "#000"
              }}
            >
              {data.restaurants.name}
            </Text>
            <View
              style={{
                backgroundColor: "#d2d2d2",
                width: width * 0.95,
                marginTop: 5,
                marginBottom: 5,
                height: 1.5
              }}
            />
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                opacity: 0.7,
                color: "#000"
              }}
            >
              {data.restaurants.city}
            </Text>
          </View>
          <Ripple
            rippleColor="#d20000"
            style={{
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              backgroundColor: "#fff",
              borderWidth: 1,
              elevation:5,
              borderColor: "#d20000",
              shadowColor: "#00000029",
              shadowOffset: { height: 4, width: 2 },
              shadowRadius: 5,
              shadowOpacity: 1 
            }}
          >
            <Text
              style={{
                margin: 15,
                fontSize: 17,
                fontFamily: "Poppins-Regular",
                color: "#d20000"
              }}
            >
              Rate your experience
            </Text>
          </Ripple>
          <Text
            style={{
              color: "#d20000",
              marginTop: 20,
              marginLeft: 20,
              fontFamily: "Poppins-Regular",
              fontSize: 18
            }}
          >
            Reservation Details
          </Text>
          <View
            style={{
              marginTop: 5,
              shadowColor: "#00000029",
              shadowOffset: { height: 2, width: 2 },
              shadowRadius: 7,
              borderRadius: 5,
              backgroundColor: "#fff",
              shadowOpacity: 1,
              width: width * 0.96,
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: "#000",
                fontSize: 15,
                margin: 10
              }}
            >
              {data.date}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: "#000",
                fontSize: 15,
                marginLeft: 10
              }}
            >
              {data.timeDiscount.time}
            </Text>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 15,
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
                  {data.timeDiscount.discount}%
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              color: "#d20000",
              marginTop: 20,
              marginLeft: 20,
              fontFamily: "Poppins-Regular",
              fontSize: 18
            }}
          >
            Personal Details
          </Text>
          <View
            style={{
              marginTop: 5,
              shadowColor: "#00000029",
              shadowOffset: { height: 2, width: 2 },
              shadowRadius: 7,
              borderRadius: 5,
              backgroundColor: "#fff",
              shadowOpacity: 1,
              width: width * 0.96,
              alignSelf: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10
              }}
            >
              <Feather name="user" color="#000" size={18} />
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#000",
                  marginLeft: 10
                }}
              >
                {data.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10
              }}
            >
              <Feather name="phone" color="#000" size={18} />
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#000",
                  marginLeft: 10
                }}
              >
                {data.mobile}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                margin: 10
              }}
            >
              <Feather name="users" color="#000" size={18} />
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#000",
                  marginLeft: 10
                }}
              >
                {data.people} Members
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </View>
    );
  }
}
export default PastDetails;
