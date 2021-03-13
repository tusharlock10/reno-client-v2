import React, {Component} from 'react';
import {Text, View, ImageBackground, FlatList} from 'react-native';
import {height, width} from '../../constants';
import Carousel from 'react-native-snap-carousel';
import Ripple from 'react-native-material-ripple';

export default class PassesComponent extends Component {
  constructor(props) {
    super(props);
    this.data = [
      {
        priceWithoutOffer: '500',
        priceWithOffer: this.props.priceFor90Days,
        time: '90 days',
      },
      {
        priceWithoutOffer: '999',
        priceWithOffer: this.props.priceFor180Days,
        time: '180 days',
      },
      {
        priceWithoutOffer: '1499',
        priceWithOffer: this.props.priceFor360Days,
        time: '360 days',
      },
    ];

    this.state = {
      sliderIndex: 1,
      selectedPrice: this.data[1].priceWithOffer,
    };
    this.props.selectedPrice(this.data[1].priceWithOffer, this.data[1].time);
  }

  _renderItem = ({item, index}) => {
    return (
      <Ripple
        rippleDuration={300}
        style={{
          width: width * 0.68,
          height: 135,
          borderRadius: 7,
        }}
        onPress={() => null}>
        <ImageBackground
          source={
            index == this.state.sliderIndex
              ? require('../../../assets/SelectedPass.png')
              : require('../../../assets/PassNotSelected.png')
          }
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          imageStyle={{borderRadius: 7}}
          resizeMode="cover">
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 18,
              color: index == this.state.sliderIndex ? '#000000' : '#fff',
            }}>
            For {item.time}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 18,
              color: index == this.state.sliderIndex ? '#000000' : '#fff',
              textDecorationLine: 'line-through',
            }}>
            ₹ {item.priceWithoutOffer}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 26,
              color: index == this.state.sliderIndex ? '#000000' : '#fff',
            }}>
            ₹ {item.priceWithOffer}
          </Text>
        </ImageBackground>
      </Ripple>
    );
  };
  render() {
    return (
      <Carousel
        data={this.data}
        renderItem={this._renderItem}
        layout={'default'}
        sliderWidth={width}
        firstItem={1}
        inactiveSlideScale={0.93}
        inactiveSlideOpacity={0.8}
        onSnapToItem={(index) => {
          this.setState({
            sliderIndex: index,
            selectedPrice: this.data[index].priceWithOffer,
          });
          this.props.selectedPrice(
            this.data[index].priceWithOffer,
            this.data[index].time,
          );
        }}
        itemWidth={width * 0.68}
      />
    );
  }
}
