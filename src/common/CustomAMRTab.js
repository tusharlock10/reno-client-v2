/**
 * NOTE: Please Do not Change Anything unless required as this is a custom component
 */

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Animated, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class TabBarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      xTabOne: 0,
      xTabTwo: 0,
      xTabThree: 0,
      xTabFour: 0,
      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(width),
      translateXTabThree: new Animated.Value(width),
      translateXTabFour: new Animated.Value(width),
      translateY: -1000,
    };
  }
  handleSlide = (type) => {
    let {
      active,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
      translateXTabFour,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
    }).start();
    if (active == 0) {
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
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabFour, {
          toValue: width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    } else if (active == 1) {
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
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabFour, {
          toValue: width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    } else if (active == 2) {
      {
        Animated.parallel([
          Animated.spring(translateXTabOne, {
            toValue: -width,
            duration: 100,
            useNativeDriver: true,
          }).start(),
          Animated.spring(translateXTabTwo, {
            toValue: -width,
            duration: 100,
            useNativeDriver: true,
          }).start(),
          Animated.spring(translateXTabThree, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start(),
          Animated.spring(translateXTabFour, {
            toValue: width,
            duration: 100,
            useNativeDriver: true,
          }).start(),
        ]);
      }
    }
  };
  render() {
    return (
      <View style={{flex: 1, marginBottom: 80}}>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 20,
              height: 43,
              position: 'relative',
              borderWidth: 0.2,
              borderColor: '#00000059',
              borderRadius: 42 / 2,
              elevation: 5,
              shadowColor: '#00000029',
              shadowOpacity: 1,
              backgroundColor: '#fff',
              shadowOffset: {height: 3, width: 3},
              shadowRadius: 7,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 1,
                borderRightColor: '#E9E9E9',
              }}
              onLayout={(event) => {
                this.setState({
                  xTabOne: event.nativeEvent.layout.x,
                });
              }}
              onPress={() =>
                this.setState({active: 0}, () =>
                  this.handleSlide(this.state.xTabOne),
                )
              }>
              <Text
                style={{
                  color: this.state.active == 0 ? '#d20000' : '#000',
                  fontFamily:
                    this.state.active == 0
                      ? 'Poppins-Medium'
                      : 'Poppins-Regular',
                  fontSize: 14,
                }}>
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: '#E9E9E9',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onLayout={(event) => {
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x,
                });
              }}
              onPress={() =>
                this.setState({active: 1}, () =>
                  this.handleSlide(this.state.xTabTwo),
                )
              }>
              <Text
                style={{
                  color: this.state.active == 1 ? '#d20000' : '#000',
                  fontFamily:
                    this.state.active == 1
                      ? 'Poppins-Medium'
                      : 'Poppins-Regular',
                  fontSize: 14,
                }}>
                Menu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 14,
              }}
              onLayout={(event) => {
                this.setState({
                  xTabThree: event.nativeEvent.layout.x,
                });
              }}
              onPress={() =>
                this.setState({active: 2}, () =>
                  this.handleSlide(this.state.xTabThree),
                )
              }>
              <Text
                style={{
                  color: this.state.active == 2 ? '#d20000' : '#000',
                  fontFamily:
                    this.state.active == 2
                      ? 'Poppins-Medium'
                      : 'Poppins-Regular',
                  fontSize: 14,
                }}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{maxHeight: '100%', maxWidth: '100%'}}>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: this.state.translateXTabOne,
                },
              ],
            }}
            onLayout={(event) =>
              this.setState({
                translateY: event.nativeEvent.layout.height,
              })
            }>
            {this.props.aboutTab}
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
            {this.props.menuTab}
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: this.state.translateXTabThree,
                },
                {
                  translateY: -this.state.translateY * 2,
                },
              ],
            }}>
            {this.props.reviewTab}
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}
export default TabBarComponent;
