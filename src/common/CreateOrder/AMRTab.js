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
          <Text>{review}</Text>
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
            this.scrollView.scrollTo({x: 0});
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
            this.scrollView.scrollTo({x: width});
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
            this.scrollView.scrollTo({x: width * 2});
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
    return (
      <View style={{width}}>
        <ScrollView style={styles.aboutView}>
          <Text style={styles.aboutText}>{this.props.about}</Text>
        </ScrollView>
      </View>
    );
  }

  renderMenu() {
    return (
      <View style={{width}}>
        <View style={styles.aboutView}>
          {this.props.menu.length ? null : (
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
      <View style={{marginVertical: 25, height: 350}}>
        {this.renderTabs()}
        <ScrollView
          nestedScrollEnabled
          ref={(ref) => (this.scrollView = ref)}
          horizontal
          snapToInterval={width}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}>
          {this.renderAbout()}
          {this.renderMenu()}
          {this.renderReviews()}
        </ScrollView>
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
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#707070',
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
