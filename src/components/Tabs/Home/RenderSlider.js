import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Image from 'react-native-fast-image';

const TILE_WIDTH = 180;
class App extends Component {
  onPressTile() {
    this.props.navigation.navigate('BrandTileRestaurants', {
      data: this.props.data,
    });
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonView}
        onPress={this.onPressTile.bind(this)}>
        <Image
          source={{uri: this.props.data.imageurl}}
          style={{flex: 1}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  buttonView: {
    height: (TILE_WIDTH * 3) / 4,
    width: TILE_WIDTH,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    marginBottom: 20,
    elevation: 10,
    overflow: 'hidden',
  },
});
