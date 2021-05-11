import React, {Component} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import Image from 'react-native-fast-image';
import {width} from '../../constants';

import {Searchbar} from 'react-native-paper';
import Header from '../Header';
import RestaurantTypes from './RestaurantTypes';
import {
  indexRestaurantTypes,
  indexSearchRestaurants,
} from '../../actions/search';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import Ripple from 'react-native-material-ripple';
import _ from 'lodash';

class SearchScreen extends Component {
  state = {
    text: '',
    dataSource: [],
  };

  componentDidMount() {
    this.props.indexRestaurantTypes();
    this.props.indexSearchRestaurants();
  }

  searchFilterFunction = _.debounce(() => {
    const text = this.state.text;
    const newData = this.props.search.restaurants.filter((item) => {
      if (this.props.route.params?.isRenoPay && !item.acceptsRenoPay) {
        return false;
      }
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
    });
  }, 350);

  onSearchResultPress(item) {
    this.props.navigation.navigate('CreateOrders', {
      city: item.city,
      name: item.name,
      timeDiscounts: item.timeDiscounts,
      imageUri: item.imageurl,
      directions: item.googlemapsurl,
      id: item.id,
    });
  }

  renderLoading() {
    if (this.props.search.restaurantTypes) return;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} color="#404040" size={36} />
        </View>
      </View>
    );
  }

  renderSearchBar() {
    if (!this.props.search.restaurantTypes) return;
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
    if (!this.props.search.restaurantTypes) return;

    if (this.state.text === '') {
      return (
        <RestaurantTypes
          navigation={this.props.navigation}
          types={this.props.search.restaurantTypes}
        />
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
                source={{uri: item.imageurl}}
                style={{height: 100, width: 100, borderRadius: 10}}
                resizeMode="cover"
              />
              <View
                style={{
                  margin: 10,
                  width: '50%',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 17,
                    color: '#000',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#7a7a7a',
                    fontSize: 16,
                  }}>
                  {item.city}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: item.rating > 3.5 ? '#299e49' : '#d20000',
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
                  {item.rating}
                </Text>
              </View>
            </Ripple>
          );
        }}
        enableEmptySections={true}
        style={{marginTop: 10}}
        keyExtractor={(item, index) => index}
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
mapStateToProps = (state) => {
  return {search: state.search};
};
export default connect(mapStateToProps, {
  indexRestaurantTypes,
  indexSearchRestaurants,
})(SearchScreen);
