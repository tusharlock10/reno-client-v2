import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Clipboard,
  StatusBar,
  ScrollView,
} from 'react-native';
import Image from 'react-native-fast-image';
import {connect} from 'react-redux';
import {width} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';
import AsyncStorage from '@react-native-async-storage/async-storage';
class MyAccount extends Component {
  state = {city: ''};

  componentDidMount() {
    AsyncStorage.getItem('city').then((city) => this.setState({city}));
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image
                // source={require("../../../assets/account_back.png")}
                source={require('../../../assets/reno_pass_header.jpg')}
                style={{
                  width: width,
                  height: 120,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
                resizeMode="cover">
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: '#fff',
                    marginBottom: 40,
                    fontSize: 15,
                  }}>
                  Valid until 31st January 2020
                </Text>
              </Image>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    height: 96,
                    width: 96,
                    borderRadius: 96 / 2,
                    shadowColor: '#0000001A',
                    shadowOffset: {height: 8, width: 0},
                    elevation: 5,
                    shadowOpacity: 1,
                    shadowRadius: 7,
                  }}>
                  <Image
                    source={{uri: this.props.auth.user.profileImage}}
                    style={{
                      height: 96,
                      width: 96,
                      borderRadius: 96 / 2,
                      borderWidth: 2,
                      borderColor: '#fff',
                    }}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 26,
                      color: '#777777',
                    }}>
                    {`${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name="location-on"
                      size={17}
                      color="#777777"
                    />
                    <Text
                      style={{
                        color: '#777777',
                        fontSize: 15,
                        marginLeft: 5,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {this.state.city}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons name="phone" size={17} color="#777777" />
                    <Text
                      style={{
                        color: '#777777',
                        fontSize: 15,
                        marginLeft: 5,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {`+91 ${this.props.auth.user.mobile}`}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons name="mail" size={17} color="#777777" />
                    <Text
                      style={{
                        color: '#777777',
                        fontSize: 15,
                        marginLeft: 5,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {this.props.auth.user.email}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: width * 0.9,
                  backgroundColor: '#fff',
                  shadowColor: '#0000004D',
                  shadowOpacity: 1,
                  shadowOffset: {width: 6, height: 6},
                  shadowRadius: 10,
                  flexDirection: 'row',
                  marginTop: 30,
                  elevation: 5,
                  alignSelf: 'center',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Image
                  source={require('../../../assets/savings.png')}
                  style={{
                    height: 120,
                    width: 116,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 15,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 18,
                      color: '#d20000',
                    }}>
                    My Savings
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 27,
                      marginTop: 20,
                    }}>
                    ₹ 500
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: width * 0.9,
                  backgroundColor: '#fff',
                  shadowColor: '#0000004D',
                  shadowOpacity: 1,
                  shadowOffset: {width: 6, height: 6},
                  shadowRadius: 10,
                  marginTop: 30,
                  alignSelf: 'center',
                  borderRadius: 10,
                  elevation: 5,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    marginTop: 25,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Image
                    source={require('../../../assets/refer_n_earn.png')}
                    style={{width: 140, height: 120}}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: 25,
                      marginLeft: 20,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize: 18,
                        color: '#d20000',
                      }}>
                      Refer and Earn
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#000',
                      }}>
                      Having friends to pay?
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 14,
                    margin: 20,
                  }}>
                  Refer your code and earn ₹ 500 for each friend you refer. Your
                  friend gets 20% off on Reno Pass.
                </Text>
                <View
                  style={{
                    height: 50,
                    width: '90%',
                    borderRadius: 4,
                    backgroundColor: '#F8F8F8',
                    borderWidth: 1,
                    borderColor: '#D2D2D2',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: '#777777',
                      fontSize: 18,
                    }}>
                    HTM9087
                  </Text>
                  <Ripple onPress={() => Clipboard.setString('HTM9087')}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#777777',
                        fontSize: 14,
                      }}>
                      Tap to copy
                    </Text>
                  </Ripple>
                </View>
                <Ripple
                  rippleColor="#d20000"
                  style={{
                    width: '60%',
                    height: 50,
                    borderRadius: 6,
                    borderWidth: 1,
                    margin: 20,
                    borderColor: '#d20000',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      color: '#d20000',
                    }}>
                    Share Your Code
                  </Text>
                </Ripple>
              </View>
              <Text
                style={{
                  marginTop: 25,
                  alignSelf: 'center',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: '#777777',
                }}>
                v2.0.0
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  alignSelf: 'center',
                  marginBottom: 25,
                  color: '#777777',
                }}>
                © Reno Media Pvt Ltd
              </Text>
            </ScrollView>
          </View>
        </SafeAreaView>
        <Header navigation={this.props.navigation} />
      </View>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          width,
          height: 55 + 45,
          justifyContent: 'flex-end',
          // backgroundColor: "rgba(115, 110, 110,0.1)",
          top: 0,
        }}>
        <Ionicons
          name="md-arrow-back"
          onPress={() => this.props.navigation.goBack()}
          color="#fff"
          size={35}
          style={{marginLeft: 15, marginBottom: 10}}
        />
      </View>
    );
  }
}

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps)(MyAccount);
