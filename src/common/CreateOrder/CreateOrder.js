import React, {Component} from 'react';
import {
  Text,
  View,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {height, width} from '../../constants';
import RenderSlots from './RenderSlots';
import DateComponent from './DateComponent';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import Header from './Header';
import Footer from './Footer';
import PeopleComponent from './PeopleComponent';
import PersonalDetails from './PersonalDetails';
import AMRTab from './AMRTab/AMRTab';
import {connect} from 'react-redux';
import {indexCreateOrder} from '../../actions/createorder';
import TermsAndConditions from './TermsAndConditions';
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import Image from 'react-native-fast-image';

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

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    date = date.getDay(date);
    this.day = setDay(date).substring(0, 3) + 'Discount';
    this.state = {
      TermsAccepted: false,
      timeStamp: new Date().getTime(),
      visible: false,
      people: 1,
      name: `${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`,
      number: '',
      discount: this.props.navigation.state.params.discount,
      time: this.props.navigation.state.params.time,
      timeDiscountId: this.props.navigation.state.params.timeDiscountId,
    };
  }
  componentDidMount() {
    this.props.indexCreateOrder(this.props.navigation.state.params.id);
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
    return (
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <Header
          navigation={this.props.navigation}
          name={this.props.navigation.state.params.name}
        />
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <Image
              source={{uri: this.props.navigation.state.params.imageUri}}
              style={{
                height: height * 0.3,
                marginBottom: 5,
                justifyContent: 'flex-end',
                width,
              }}
              resizeMode="cover">
              <View
                style={{
                  height: 38,
                  width: 60,
                  marginTop: 45,
                  opacity: 0.8,
                  alignSelf: 'flex-end',
                  borderTopLeftRadius: 5,
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 19,
                    color: '#000',
                  }}>
                  4.5
                </Text>
                <Ionicons
                  name="ios-star"
                  color="#000"
                  size={20}
                  style={{marginLeft: 5}}
                />
              </View>
            </Image>

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
                  {this.props.navigation.state.params.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                    opacity: 0.7,
                    color: '#000',
                  }}>
                  {this.props.navigation.state.params.city}
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
                  this.props.navigation.state.params.directions,
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
                  this.day =
                    setDay(new Date(timeStamp).getDay()).substring(0, 3) +
                    'Discount';
                  this.props.indexCreateOrder(
                    this.props.navigation.state.params.id,
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
                    : this.props.navigation.state.params.timeDiscounts
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
            <AMRTab />
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
            restaurantId={this.props.navigation.state.params.id}
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
mapStateToProps = (state) => {
  return {createorder: state.createorder, auth: state.auth};
};
export default connect(mapStateToProps, {indexCreateOrder})(CreateOrder);
