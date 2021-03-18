import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import Image from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import {width} from '../../constants';
class RestaurantTypes extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <Text
          style={{
            color: '#777777',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            marginLeft: 20,
            marginBottom: 10,
          }}>
          Top Categories
        </Text>
        <FlatList
          data={this.props.types.data}
          style={{alignSelf: 'center', width: width * 0.95}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={({item, index}) => {
            return (
              <Ripple
                style={{
                  height: 120,
                  flexDirection: 'column',
                  margin: 8,
                  width: '45.6%',
                  alignSelf: 'center',
                  borderRadius: 6,
                }}
                onPress={() =>
                  this.props.navigation.navigate('TypeScreen', {
                    name: item.type,
                    id: item.id,
                  })
                }>
                <Image
                  source={{uri: item.imageurl}}
                  style={{borderRadius: 10}}
                  imageStyle={{borderRadius: 6}}>
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize: 18,
                        color: '#fff',
                      }}>
                      {item.type}
                    </Text>
                  </View>
                </Image>
              </Ripple>
            );
          }}
          numColumns={2}
        />
      </View>
    );
  }
}
export default RestaurantTypes;
