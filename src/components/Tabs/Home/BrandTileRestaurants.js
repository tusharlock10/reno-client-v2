import React, {Component} from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../common/Header';
import RenderRestaurants from './RenderRestaurants';
import axios from '../../../api';

class BrandTileRestaurants extends Component {
  state = {loading: true, data: []};

  componentDidMount() {
    this.getBrandTileData();
  }

  getBrandTileData = async () => {
    const {data} = await axios.get(
      `/brandTiles/${this.props.navigation.state.params.data.id}`,
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
        renderItem={({item}) => {
          return (
            <RenderRestaurants
              id={item.id}
              city={item.city}
              name={item.name}
              timeDiscounts={item[this.day] ? item[this.day].timeDiscounts : []}
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
          onBack={() => this.props.navigation.pop()}
          text={this.props.navigation.state.params.data.type}
        />
        {this.renderLoading()}
        {this.renderRestaurants()}
      </View>
    );
  }
}

export default BrandTileRestaurants;
