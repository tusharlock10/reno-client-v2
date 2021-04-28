import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Image from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {width} from '../../constants';

class AMRTab extends Component {
  scrollView = null;
  state = {index: 0};

  renderReviewItem({item}) {
    let {rating, review, user} = item;
    rating = 3;
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            height: 42,
            width: 42,
            borderRadius: 21,
            overflow: 'hidden',
            elevation: 5,
            backgroundColor: '#fff',
            marginLeft: 3,
          }}>
          <Image source={{uri: user.profileImage}} style={{flex: 1}} />
        </View>
        <View style={{marginLeft: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 14,
                marginRight: 10,
                marginTop: 2,
              }}>
              {user.firstname}
            </Text>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <MaterialCommunityIcons
                  name={index <= rating - 1 ? 'star' : 'star-outline'}
                  size={14}
                  color={'#FDD835'}
                />
              ))}
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12}}>
              {review}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTabs() {
    return (
      <View style={styles.tabView}>
        <TouchableOpacity
          style={styles.tabInnerView}
          onPress={() => {
            this.setState({index: 0});
          }}>
          <Text
            style={
              this.state.index === 0 ? styles.tabTextSelected : styles.tabText
            }>
            About
          </Text>
        </TouchableOpacity>
        <View
          style={{height: '100%', width: 0.2, backgroundColor: '#707070'}}
        />
        <TouchableOpacity
          style={styles.tabInnerView}
          onPress={() => {
            this.setState({index: 1});
          }}>
          <Text
            style={
              this.state.index === 1 ? styles.tabTextSelected : styles.tabText
            }>
            Menu
          </Text>
        </TouchableOpacity>
        <View
          style={{height: '100%', width: 0.2, backgroundColor: '#707070'}}
        />
        <TouchableOpacity
          style={styles.tabInnerView}
          onPress={() => {
            this.setState({index: 2});
          }}>
          <Text
            style={
              this.state.index === 2 ? styles.tabTextSelected : styles.tabText
            }>
            Reviews
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderAbout() {
    if (this.state.index !== 0) {
      return;
    }
    return (
      <View style={{width}}>
        <ScrollView style={styles.aboutView}>
          <Text style={styles.aboutText}>{this.props.about}</Text>
        </ScrollView>
      </View>
    );
  }

  renderMenu() {
    if (this.state.index !== 1) {
      return;
    }

    return (
      <View style={{width}}>
        <View style={styles.aboutView}>
          {this.props.menu.length ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                  }}>
                  Item
                </Text>
              </View>
              <View style={{width: 70, alignItems: 'center'}}>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16}}>
                  Price
                </Text>
              </View>
            </View>
          ) : null}

          {this.props.menu.length ? (
            this.props.menu.map((item, index) => {
              const finalPrice = this.props.discount
                ? parseInt(item.Price * (1 - this.props.discount / 100))
                : item.Price;

              const originalPrice = this.props.discount ? item.Price : null;

              return (
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 12,
                        width: 15,
                      }}>{`${index}.`}</Text>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: '#d20000',
                          fontSize: 16,
                          flexWrap: 'wrap',
                        }}>
                        {item.Item}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: 70,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: originalPrice
                        ? 'space-between'
                        : 'center',
                    }}>
                    {originalPrice ? (
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          textDecorationLine: 'line-through',
                          fontSize: 12,
                        }}>
                        ₹{originalPrice}
                      </Text>
                    ) : null}
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#d20000',
                      }}>
                      ₹{finalPrice}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.menuNotFound}>Menu not found</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  renderReviews() {
    if (this.state.index !== 2) {
      return;
    }
    return (
      <View style={{width}}>
        <View style={styles.aboutView}>
          <FlatList
            nestedScrollEnabled
            contentContainerStyle={{flexGrow: 1}}
            data={this.props.userReviewses}
            ItemSeparatorComponent={() => (
              <View style={{width: '90%', alignSelf: 'center', height: 1}} />
            )}
            keyExtractor={(_, index) => index.toString()}
            renderItem={this.renderReviewItem.bind(this)}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{marginVertical: 25}}>
        {this.renderTabs()}
        {this.renderAbout()}
        {this.renderMenu()}
        {this.renderReviews()}
      </View>
    );
  }
}
export default AMRTab;

const styles = StyleSheet.create({
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 20,
    elevation: 5,
    borderWidth: 0.2,
    borderColor: '#707070',
    marginBottom: 10,
    marginHorizontal: 15,
  },
  tabInnerView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  tabText: {fontSize: 14, fontFamily: 'Poppins-Regular', color: '#707070'},
  tabTextSelected: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#d20000',
  },
  aboutView: {
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    fontSize: 14,
  },
  aboutText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#404040',
    textAlign: 'justify',
  },
  menuNotFound: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#707070',
  },
});
