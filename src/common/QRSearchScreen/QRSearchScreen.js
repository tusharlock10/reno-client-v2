import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Image
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { indexSearchRestaurants } from "../../actions/search";
import { width, height } from "../../constants";
import Ripple from "react-native-material-ripple";
import { ActivityIndicator } from "react-native-paper";

class QRSearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      dataSource: ""
    };
  }

  componentDidMount() {
    this.props.indexSearchRestaurants();
  }

  SearchFilterFunction(text) {
    const newData = this.props.search.restaurants.data.filter(function(item) {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      text: text
    });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <AntDesign
          name="close"
          color="#707070"
          size={25}
          style={{ margin: 15 }}
          onPress={() => this.props.navigation.pop()}
        />
        {this.props.search.restaurants ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: 70,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOffset: { height: 6, width: 0 },
                shadowOpacity: 0.1,
                elevation: 10,
                justifyContent: "flex-end"
              }}
            >
              <TextInput
                style={{
                  fontSize: 25,
                  fontFamily: "Poppins-SemiBold",
                  color: "#000",
                  marginLeft: 20,
                  marginBottom: 20
                }}
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.text}
                autoFocus
                placeholder='Search For "Restaurants"'
                placeholderTextColor="#707070"
                selectionColor="#000"
              />
            </View>
            {this.state.text == "" ? (
              <View />
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={this.state.dataSource}
                renderItem={({ item }) => {
                  return (
                    <Ripple
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 10
                      }}
                      onPress={() =>
                        this.props.navigation.navigate("EnterAmountScreen", {
                          imageurl:item.imageurl,
                          name:item.name,
                          city:item.city
                        })
                      }
                    >
                      <Image
                        source={{ uri: item.imageurl }}
                        style={{ height: 100, width: 100, borderRadius: 10 }}
                        resizeMode="cover"
                      />
                      <View
                        style={{
                          margin: 10,
                          width: "50%",
                          justifyContent: "space-between"
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Poppins-Medium",
                            fontSize: 17,
                            color: "#000"
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins-Regular",
                            color: "#7a7a7a",
                            fontSize: 16
                          }}
                        >
                          {item.city}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          backgroundColor: "#d20000",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                          borderRadius: 5
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Poppins-Bold",
                            fontSize: 17,
                            color: "#fff"
                          }}
                        >
                          {item.rating}
                        </Text>
                      </View>
                    </Ripple>
                  );
                }}
                enableEmptySections={true}
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index}
              />
            )}
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator animating={true} color="#d20000" size="large" />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
mapStateToProps = state => {
  console.log(state);
  return { search: state.search };
};
export default connect(mapStateToProps, { indexSearchRestaurants })(
  QRSearchScreen
);
