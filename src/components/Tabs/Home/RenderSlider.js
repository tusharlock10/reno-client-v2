import React, { Component } from "react";
import { Text, View, Image } from "react-native";
// import Ripple from "react-native-material-ripple";
import TouchableScale from "react-native-touchable-scale";
class App extends Component {
  render() {
    return (
      <TouchableScale
        activeScale={0.96}
        style={{
          height: 130,
          width: 180,
          borderRadius: 10,
          backgroundColor: "#fff",
          marginLeft: 5,
          marginRight: 5,
          marginTop: 15,
          shadowColor: "#000",
          shadowOffset: { height: 4, width: 1 },
          shadowOpacity: 0.2,
          marginBottom: 20,
          elevation:10,
        }}
      >
        <Image
          source={{ uri: this.props.image }}
          style={{ height: "100%", width: "100%", borderRadius: 10 }}
          resizeMode="cover"
        />
      </TouchableScale>
    );
  }
}
export default App;
