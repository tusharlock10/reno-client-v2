import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import RenderRestaurants from './RenderRestaurants';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {indexRestaurants, brandTiles} from '../../../actions/restaurant';
import {width} from '../../../constants';
import setCityValue from '../../../utils/setCityValue';
import AsyncStorage from '@react-native-community/async-storage';
import RenderSlider from './RenderSlider';
import SlideShow from './Slideshow';

const setDay = function getDay(date) {
  if (date == 0) {
    day = 'sunday';
  }
  if (date == 1) {
    day = 'monday';
  }
  if (date == 2) {
    day = 'tuesday';
  }
  if (date == 3) {
    day = 'wednesday';
  }
  if (date == 4) {
    day = 'thursday';
  }
  if (date == 5) {
    day = 'friday';
  }
  if (date == 6) {
    day = 'saturday';
  }

  return day;
};

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: 'Indore',
    };
  }

  async componentDidMount() {
    // await AsyncStorage.setItem("city", "Delhi");
    let date = new Date();
    date = date.getDay(date);
    this.day = setDay(date);
    this.renderData();
  }
  async renderData() {
    const city = await AsyncStorage.getItem('city');
    setCityValue(city);
    this.setState({city});
    this.props.brandTiles();
    this.props.indexRestaurants();
  }
  onGoBack = (someData) => {
    this.renderData();
  };
  render() {
    // const day = this.props.restaurants.restaurants.data.day;
    return (
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
        <StatusBar backgroundColor="#fff" barStyle="dark-content" animated />
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          {/*Start of header component */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              width: width,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: width,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ChangeCity', {
                    onGoBack: this.onGoBack,
                  })
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 16,
                    color: '#d20000',
                    marginRight: 5,
                    marginTop: 5,
                  }}>
                  {this.state.city}
                </Text>
                <AntDesign
                  name="caretdown"
                  size={16}
                  color="#d20000"
                  style={{paddingTop: 2}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 40,
                  color: '#d20000',
                  alignSelf: 'center',
                }}>
                reno
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.navigation.openDrawer()}
                style={{
                  borderRadius: 20,
                  shadowColor: '#000',
                  marginTop: 10,
                  shadowOpacity: 0.4,
                  elevation: 3,
                  shadowOffset: {height: 2, width: 2},
                }}>
                <Image
                  source={{uri: this.props.auth.user.profileImage}}
                  borderRadius={40 / 2}
                  style={{
                    height: 40,
                    width: 40,
                    borderWidth: 2,
                    borderColor: '#fff',
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <Searchbar
              style={{
                marginTop: 15,
                width: width * 0.9,
                height: 50,
                marginBottom: 5,
                backgroundColor: '#fff',
                shadowOpacity: 0.25,
                borderRadius: 10,
              }}
              placeholder='Search for "Restaurants"'
              placeholderTextColor="#D1D1D1"
              inputStyle={{
                color: '#3E3E3E',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
              }}
              onFocus={() => this.props.navigation.navigate('SearchScreen')}
              selectionColor="#d20000"
            />
            {/*End of header component */}
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              {this.props.restaurants.gotRestaurantData &&
              this.props.restaurants.gotBrandTiles ? (
                <View style={{alignItems: 'center'}}>
                  <FlatList
                    data={this.props.restaurants.brandTiles.data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    renderItem={({item}) => {
                      return (
                        <RenderSlider
                          image={item.imageurl}
                          navigation={this.props.navigation}
                        />
                      );
                    }}
                  />
                  <SlideShow navigation={this.props.navigation} />
                  <FlatList
                    ListHeaderComponent={
                      <View
                        style={{
                          marginLeft: 25,
                          marginTop: 20,
                          marginBottom: 10,
                          marginRight: 25,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 25,
                            fontFamily: 'Poppins-SemiBold',
                            color: '#000',
                          }}>
                          Top Restaurants
                        </Text>
                      </View>
                    }
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    initialNumToRender={10}
                    data={this.props.restaurants.restaurants.data}
                    renderItem={({item}) => {
                      return (
                        <RenderRestaurants
                          id={item.id}
                          city={item.city}
                          name={item.name}
                          timeDiscounts={
                            item[this.day] ? item[this.day].timeDiscounts : []
                          }
                          isRenoPayEnabled={true}
                          image={item.imageurl}
                          directions={item.googlemapsurl}
                          navigation={this.props.navigation}
                        />
                      );
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#d20000" />
                </View>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = {
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
};

mapStateToProps = ({auth, restaurants}) => ({auth, restaurants});

export default connect(mapStateToProps, {indexRestaurants, brandTiles})(
  HomeScreen,
);
