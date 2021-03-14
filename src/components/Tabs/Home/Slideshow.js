import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Ripple from "react-native-material-ripple";
import Carousel from "react-native-snap-carousel";
import { ONBOARDING, width } from "../../../constants";
import TouchableScale from "react-native-touchable-scale";

class SlideShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderIndex: 0,
      entries: 3
    };
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableScale
        onPress={() => this.props.navigation.navigate("RenoPassScreen")}
        activeScale={0.97}
      >
        <Image
          style={{
            height: 150,
            width: width * 0.88,
            borderRadius: 15,
            alignSelf: "center"
          }}
          source={item.ASSET}
          resizeMode="cover"
        />
      </TouchableScale>
    );
  };

  render() {
    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={ONBOARDING}
        // autoplay
        // loop
        renderItem={this._renderItem}
        onSnapToItem={index => this.setState({ sliderIndex: index })}
        sliderWidth={width}
        inactiveSlideScale={0.93}
        inactiveSlideOpacity={0.8}
        style={{ borderRadius: 10 }}
        itemWidth={width * 0.88}
      />
    );
  }
}

export default SlideShow;
