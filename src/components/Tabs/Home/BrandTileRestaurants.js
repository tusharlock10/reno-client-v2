import React, {Component} from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../common/Header';
import RenderRestaurants from './RenderRestaurants';
import {getDayFromNumber} from '../../../utils/dateTimeUtils';

class BrandTileRestaurants extends Component {
  state = {loading: true, data: []};

  componentDidMount() {
    this.getBrandTileData();
  }

  getBrandTileData = async () => {
    let brandTile;
    this.props.restaurants.brandTiles.map((item) => {
      if (item.id === this.props.route.params.data.id) {
        brandTile = item;
      }
    });

    const brandTileRestaurantIds = brandTile.restaurantses.map(
      (item) => item.id,
    );
    const data = this.props.restaurants.restaurants.filter((restaurant) =>
      brandTileRestaurantIds.includes(restaurant.id),
    );
    this.setState({data, loading: false});
  };

  renderLoading() {
    if (!this.state.loading) return;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={'#404040'} size={36} />
      </View>
    );
  }

  renderRestaurants() {
    if (this.state.loading) return;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={this.state.data}
        contentContainerStyle={{paddingTop: 20}}
        renderItem={({item}) => {
          const day = getDayFromNumber(new Date().getDay());
          return (
            <RenderRestaurants
              id={item.id}
              city={item.city}
              name={item.name}
              timeDiscounts={item[day] ? item[day].timeDiscounts : []}
              isRenoPayEnabled={true}
              image={item.imageurl}
              directions={item.googlemapsurl}
              navigation={this.props.navigation}
            />
          );
        }}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          onBack={() => this.props.navigation.goBack()}
          text={this.props.route.params.data.type}
        />
        {this.renderLoading()}
        {this.renderRestaurants()}
      </View>
    );
  }
}

const mapStateToProps = ({restaurants}) => ({restaurants});

export default connect(mapStateToProps, {})(BrandTileRestaurants);
