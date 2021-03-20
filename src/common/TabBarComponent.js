import React from 'react';
import {View, Text, Animated, Dimensions} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

class TabBarComponent extends React.Component {
  state = {
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width),
    translateY: -1000,
  };

  handleSlide = (type) => {
    let {
      active,
      xTabOne,
      xTabTwo,
      translateX,
      translateXTabOne,
      translateXTabTwo,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    }
  };

  render() {
    let {
      xTabOne,
      xTabTwo,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateY,
    } = this.state;
    return (
      <View style={{flex: 1, marginTop: 20,}}>
        <View
          style={{
            flexDirection: 'row',
            height: 55,
            marginBottom: 10,
            borderRadius: 5,
            backgroundColor: '#fff',
            position: 'relative',
            elevation: 7,
            marginHorizontal: 10,
            overflow:'hidden'
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              width: '50%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: '#d20000',
              transform: [
                {
                  translateX,
                },
              ],
            }}
          />
          <Ripple
            rippleColor="#d20000"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onLayout={(event) =>
              this.setState({
                xTabOne: event.nativeEvent.layout.x,
              })
            }
            onPress={() =>
              this.setState({active: 0}, () => this.handleSlide(xTabOne))
            }>
            <Text
              style={{
                color: active === 0 ? '#fff' : '#000',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Upcoming
            </Text>
          </Ripple>
          <Ripple
            rippleColor="#d20000"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderLeftWidth: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onLayout={(event) =>
              this.setState({
                xTabTwo: event.nativeEvent.layout.x,
              })
            }
            onPress={() =>
              this.setState({active: 1}, () => this.handleSlide(xTabTwo))
            }>
            <Text
              style={{
                color: active === 1 ? '#fff' : '#000',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Completed
            </Text>
          </Ripple>
        </View>

        <Animated.View
          style={{
            transform: [
              {
                translateX: translateXTabOne,
              },
            ],
          }}
          onLayout={(event) =>
            this.setState({
              translateY: event.nativeEvent.layout.height,
            })
          }>
          {this.props.upcomingBooking}
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              {
                translateX: this.state.translateXTabTwo,
              },
              {
                translateY: -this.state.translateY,
              },
            ],
          }}>
          {this.props.pastBooking}
        </Animated.View>
      </View>
    );
  }
}

export default TabBarComponent;
