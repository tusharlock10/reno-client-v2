import React, {Component, Fragment} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import Image from 'react-native-fast-image';
import {height, width} from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../api';
import {ActivityIndicator} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';

class ChangeCity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cityData: [],
    };
  }

  async componentDidMount() {
    const cities = await axios.get('/city');
    this.setState({loading: false, cityData: cities.data});
  }

  render() {
    if (!this.state.loading)
      return (
        <Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: '#ECECEC'}} />
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#ECECEC',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  width,
                  alignItems: 'flex-end',
                  opacity: 0.1,
                }}>
                <Text
                  style={{
                    fontSize: 75,
                    marginRight: 10,
                    marginBottom: 15,
                    fontFamily: 'Poppins-Bold',
                    color: '#d20000',
                  }}>
                  Location
                </Text>
              </View>
              <View style={{width}}>
                <Text
                  style={{
                    fontSize: 42,
                    marginLeft: 10,
                    fontFamily: 'Poppins-Bold',
                    color: '#d20000',
                  }}>
                  Location
                </Text>
              </View>
              <View
                style={{
                  height: height * 0.8,
                  width,
                  backgroundColor: '#fff',
                  shadowColor: '#00000029',
                  shadowOpacity: 1,
                  alignItems: 'center',
                  shadowOffset: {height: -3, width: 0},
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{marginTop: 30}}
                  data={this.state.cityData}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item}) => {
                    return (
                      <Ripple
                        onPress={async () => {
                          await AsyncStorage.setItem('city', item.city);
                          this.props.navigation.replace('Tabs');
                        }}
                        style={{
                          borderRadius: 13,
                          height: 150,
                          width: width * 0.9,
                          marginBottom: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item.imageUrl}}
                          resizeMode="cover"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <LinearGradient
                            colors={['#000000', '#090909F6', '#FFFFFF00']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              opacity: 0.44,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 10,
                            }}></LinearGradient>
                          <Text
                            style={{
                              fontSize: 17,
                              fontFamily: 'Poppins-Bold',
                              color: '#fff',
                              textTransform: 'uppercase',
                            }}>
                            {item.city}
                          </Text>
                        </Image>
                      </Ripple>
                    );
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </Fragment>
      );
    else
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} color="#d20000" size="large" />
        </View>
      );
  }
}
export default ChangeCity;
