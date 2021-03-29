import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import Image from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import {width} from '../../constants';
class RestaurantTypes extends Component {
  onGridItemPress(item) {
    this.props.navigation.navigate('TypeScreen', {
      name: item.type,
      id: item.id,
    });
  }

  renderGridItem({item, index}) {
    return (
      <Ripple
        style={styles.rippleView}
        onPress={this.onGridItemPress.bind(this, item)}>
        <Image source={{uri: item.imageurl}} style={{flex: 1}}>
          <View style={styles.imageView}>
            <Text style={styles.imageText}>{item.type}</Text>
          </View>
        </Image>
      </Ripple>
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.types}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        contentContainerStyle={{flexGrow: 1}}
        numColumns={2}
        ListHeaderComponent={
          <Text style={styles.headingText}>Top Categories</Text>
        }
        ListFooterComponent={<View style={{height: 50}} />}
        renderItem={this.renderGridItem.bind(this)}
      />
    );
  }
}
export default RestaurantTypes;

const styles = StyleSheet.create({
  headingText: {
    color: '#707070',
    fontFamily: 'Poppins-SemiBold',
    marginTop:20,
    fontSize: 18,
    marginLeft: 20,
  },
  rippleView: {
    height: 120,
    flexDirection: 'column',
    margin: 8,
    flex: 1,
    alignSelf: 'center',
    borderRadius: 6,
    elevation: 7,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  imageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
