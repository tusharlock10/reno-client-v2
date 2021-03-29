import React, {Component} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import Header from '../Header';
import axios from '../../api';
import RenderRestaurants from '../../components/Tabs/Home/RenderRestaurants';
import {ActivityIndicator} from 'react-native-paper';
class TypeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      restaurants: null,
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      `type/${this.props.navigation.state.params.id}`,
    );
    this.setState({restaurants: response.data, loading: false});
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Header
          onBack={() => this.props.navigation.pop()}
          text={this.props.navigation.state.params.name}
        />
        {this.state.loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} color="#d20000" size="large" />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<View style={{height:20}}/>}
            ListFooterComponent={<View style={{height:50}}/>}
            keyExtractor={(item) => item.id}
            data={this.state.restaurants}
            renderItem={({item, index}) => {
              return (
                <RenderRestaurants
                  id={item.id}
                  city={item.city}
                  name={item.name}
                  timeDiscounts={item.timeDiscounts}
                  isRenoPayEnabled={true}
                  image={item.imageurl}
                  directions={item.googlemapsurl}
                  navigation={this.props.navigation}
                />
              );
            }}
          />
        )}
      </SafeAreaView>
    );
  }
}
export default TypeScreen;
