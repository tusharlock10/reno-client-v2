import React, {Component} from 'react';
import {
  Text,
  View,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {height, width} from '../../constants';
import RenderSlots from './RenderSlots';
import DateComponent from './DateComponent';
import Header from './Header';
import Footer from './Footer';
import PeopleComponent from './PeopleComponent';
import PersonalDetails from './PersonalDetails';
import AMRTab from './AMRTab';
import {connect} from 'react-redux';
import {indexCreateOrder} from '../../actions/createorder';
import TermsAndConditions from './TermsAndConditions';
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import Image from 'react-native-fast-image';
import {getDayFromNumber} from '../../utils/dateTimeUtils';

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.day =
      getDayFromNumber(new Date().getDay()).substring(0, 3) + 'Discount';
    this.state = {
      TermsAccepted: __DEV__ ? true : false,
      timeStamp: new Date().getTime(),
      visible: false,
      people: 1,
      name: `${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`,
      number: __DEV__ ? '9354527144' : '',
      discount: this.props.route.params.discount,
      time: this.props.route.params.time,
      timeDiscountId: this.props.route.params.timeDiscountId,
      imageIndex: 0,
    };
  }
  componentDidMount() {
    this.props.indexCreateOrder(this.props.route.params.id);
  }
  openGoogleMaps(url) {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    if (!this.props.createorder.orderData) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={36} />
        </View>
      );
    }

    const imagesData = [
      this.props.createorder.orderData.imageurl,
      ...this.props.createorder.orderData.restaurantImages,
    ];

    return (
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <Header
          navigation={this.props.navigation}
          name={this.props.route.params.name}
          acceptsRenoPay={this.props.route.params.acceptsRenoPay}
        />
        <View style={{flex: 1}}>
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View>
              <FlatList
                data={imagesData}
                pagingEnabled
                horizontal
                snapToInterval={width}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onMomentumScrollEnd={(event) => {
                  const imageIndex = Math.round(
                    event.nativeEvent.contentOffset.x / width,
                  );
                  this.setState({imageIndex});
                }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                  <Image
                    source={{uri: item}}
                    style={{
                      height: (width * 9) / 16,
                      width,
                    }}
                    resizeMode="cover"
                  />
                )}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}} />
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      marginBottom: 3,
                      borderRadius: 50,
                      width: 40,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 14,
                        marginTop: 3,
                      }}>{`${this.state.imageIndex + 1}/${
                      imagesData.length
                    }`}</Text>
                  </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <View
                    style={{
                      borderTopLeftRadius: 5,
                      flexDirection: 'row',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 18,
                        color: '#000',
                        marginRight: 5,
                      }}>
                      4.5
                    </Text>
                    <Ionicons name="star" color="#000" size={18} />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                margin: 10,
                width: width,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{width: '75%'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 20,
                    color: '#000',
                  }}>
                  {this.props.route.params.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                    opacity: 0.7,
                    color: '#000',
                  }}>
                  {this.props.route.params.city}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '25%',
                }}
                onPress={this.openGoogleMaps.bind(
                  this,
                  this.props.route.params.directions,
                )}>
                <Image
                  source={require('../../../assets/compass.png')}
                  style={{height: 30, width: 30}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    marginTop: 5,
                    color: '#000',
                    fontSize: 13,
                  }}>
                  Direction
                </Text>
              </TouchableOpacity>
            </View>
            <DateComponent
              callbackFromMainCalendar={(timeStamp) => {
                if (this.state.timeStamp != timeStamp) {
                  this.setState({timeStamp});
                  this.day = `${getDayFromNumber(
                    new Date(timeStamp).getDay(),
                  ).substring(0, 3)}Discount`;
                  this.props.indexCreateOrder(
                    this.props.route.params.id,
                    timeStamp,
                  );
                }
              }}
            />
            <Text
              style={{
                marginTop: 15,
                fontFamily: 'Poppins-Regular',
                color: '#000000',
                fontSize: 17,
                marginLeft: 15 + 7,
              }}>
              What time?
            </Text>
            {this.props.createorder.loading ? (
              <View
                style={{
                  width: width,
                  height: 50,
                  marginLeft: 10,
                  marginTop: 20,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator
                  animating={true}
                  color="#d20000"
                  size="small"
                />
              </View>
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                style={{height: 80, marginLeft: 15, marginRight: 15}}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                data={
                  this.state.timeStamp != null &&
                  this.props.createorder.orderData
                    ? this.props.createorder.orderData.timeDiscounts
                    : this.props.route.params.timeDiscounts
                }
                renderItem={({item, index}) => {
                  return (
                    <RenderSlots
                      discount={item[this.day]}
                      time={item.time}
                      id={item.id}
                      backgroundColor={
                        this.state.discount == item[this.day] &&
                        this.state.time == item.time
                          ? '#FFA500'
                          : '#d20000'
                      }
                      callbackFromChild={(discount, time, id) => {
                        this.setState({discount, time, timeDiscountId: id});
                      }}
                    />
                  );
                }}
              />
            )}
            <PeopleComponent
              callbackFromPeople={(people) => {
                this.setState({people});
              }}
            />
            <PersonalDetails
              name={this.state.name}
              number={this.state.number}
              callbackAsName={(name) => this.setState({name})}
              callbackAsNumber={(number) => this.setState({number})}
            />
            <AMRTab
              discount={this.state.discount}
              about={this.props.createorder.orderData.about}
              menu={this.props.createorder.orderData.menu}
              userReviewses={this.props.createorder.orderData.userReviewses}
            />
            <TermsAndConditions
              callbackFromChild={(state) => {
                this.setState({TermsAccepted: state});
              }}
            />
          </ScrollView>
          <Footer
            navigation={this.props.navigation}
            people={this.state.people}
            name={this.state.name}
            phoneno={this.state.number}
            restaurantId={this.props.route.params.id}
            timeDiscountId={this.state.timeDiscountId}
            date={this.state.timeStamp}
            callbackFromParent={(show) => {
              if (show) {
                this.setState({visible: show});
              }
            }}
            active={this.state.TermsAccepted}
          />
          <Snackbar
            visible={this.state.visible}
            theme={{colors: {accent: 'white'}}}
            style={{
              position: 'absolute',
              bottom: 0,
              elevation: 17,
              backgroundColor: '#FFA500',
              height: 55,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 5,
            }}
            onDismiss={() => this.setState({visible: false})}
            action={{
              label: 'Okay',
              onPress: () => {
                null;
              },
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
                color: '#fff',
              }}>
              Accept Terms & Conditions
            </Text>
          </Snackbar>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    height: height,
    width: width,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

mapStateToProps = ({createorder, auth}) => ({createorder, auth});

export default connect(mapStateToProps, {indexCreateOrder})(CreateOrder);
