import React, {Component} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import Image from 'react-native-fast-image';
import {width} from '../../constants';

import {Searchbar} from 'react-native-paper';
import Header from '../Header';
import {getMyReservations} from '../../actions/reservations';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import Ripple from 'react-native-material-ripple';
import _ from 'lodash';

class QRSearchScreen extends Component {
  state = {
    text: '',
    dataSource: [],
  };

  searchFilterFunction = _.debounce(() => {
    const text = this.state.text;
    const newData = this.props.reservations.orders.upcomingOrders.filter(
      (item) => {
        const itemData = item.restaurants.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      },
    );
    this.setState({
      dataSource: newData,
    });
  }, 350);

  onSearchResultPress(data) {
    this.props.navigation.navigate('EnterAmountScreen', {data});
  }

  renderLoading() {
    if (!this.props.reservations.loading) return;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} color="#404040" size={36} />
        </View>
      </View>
    );
  }

  renderSearchBar() {
    if (this.props.reservations.loading) return;
    return (
      <Searchbar
        style={{
          marginTop: 10,
          width: width * 0.9,
          height: 50,
          marginBottom: 10,
          alignSelf: 'center',
          backgroundColor: '#fff',
          shadowOpacity: 0.25,
          borderRadius: 10,
        }}
        onChangeText={(text) => {
          this.setState({text});
          this.searchFilterFunction();
        }}
        value={this.state.text}
        placeholder='Search for "Restaurants"'
        placeholderTextColor="#D1D1D1"
        inputStyle={{
          color: '#3E3E3E',
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
        }}
        autoFocus={false}
        selectionColor="#d20000"
      />
    );
  }

  renderSearchList() {
    if (this.props.reservations.loading) return;

    if (this.state.text === '') {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#707070',
              fontSize: 18,
              textAlign: 'center',
              padding: 40,
            }}>
            Search and pay at <Text style={{color: '#299e49'}}>Reno Pay</Text>{' '}
            restaurants
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={this.state.dataSource}
        renderItem={({item}) => {
          return (
            <Ripple
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
              }}
              onPress={this.onSearchResultPress.bind(this, item)}>
              <Image
                source={{uri: item.restaurants.imageurl}}
                style={{height: 100, width: 100, borderRadius: 10}}
                resizeMode="cover"
              />
              <View
                style={{
                  margin: 10,
                  width: '50%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 17,
                    color: '#000',
                  }}>
                  {item.restaurants.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#7a7a7a',
                    fontSize: 16,
                  }}>
                  {item.restaurants.city}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#7a7a7a',
                    fontSize: 14,
                  }}>
                  {item.date}{' '}
                  <Text style={{fontSize: 12}}>{item.timeDiscount.time}</Text>
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: '#d20000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 17,
                    color: '#fff',
                  }}>
                  {item.restaurants.rating}
                </Text>
              </View>
            </Ripple>
          );
        }}
        enableEmptySections={true}
        style={{marginTop: 10}}
        keyExtractor={(_, index) => index}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Header onBack={() => this.props.navigation.goBack()} text="Search" />
        {this.renderLoading()}
        {this.renderSearchBar()}
        {this.renderSearchList()}
      </SafeAreaView>
    );
  }
}
mapStateToProps = ({reservations}) => ({reservations});
export default connect(mapStateToProps, {getMyReservations})(QRSearchScreen);
