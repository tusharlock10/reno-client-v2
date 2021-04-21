import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Image from 'react-native-fast-image';
import {height, width} from '../../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import axios from '../../../../api';
class PastDetails extends Component {
  state = {
    rating: 0,
    review: '',
    isReviewActive: false,
    submitLoading: false,
  };

  submitUserReview = async () => {
    const {data} = this.props.route.params;
    const {rating, review} = this.state;
    if (!rating) {
      return;
    }

    this.setState({submitLoading: true});
    try {
      await axios.post(`/restaurant/${data.restaurants.id}/review`, {
        review,
        rating,
      });
    } catch (e) {
      alert('Error while uploading your review : ', e);
    }
    this.setState({submitLoading: false});
  };

  renderReviewInput() {
    const {isReviewActive, rating, review} = this.state;

    if (!isReviewActive) {
      return (
        <Ripple
          rippleColor="#d20000"
          style={styles.rateButton}
          onPress={() => this.setState({isReviewActive: true})}>
          <Text style={styles.rateButtonText}>Rate your experience</Text>
        </Ripple>
      );
    }
    return (
      <View style={styles.reviewInputView}>
        <TextInput
          value={review}
          onChangeText={(review) => this.setState({review})}
          multiline
          placeholder={'How was your experience?'}
          style={styles.reviewInput}
        />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
          }}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Ionicons
                key={index.toString()}
                name={index <= rating - 1 ? 'star' : 'star-outline'}
                size={26}
                color={'#FDD835'}
                onPress={() => this.setState({rating: index + 1})}
              />
            ))}
        </View>
        <View style={styles.submitButtonView}>
          {this.state.submitLoading ? (
            <ActivityIndicator color={'#d20000'} size={24} />
          ) : (
            <Text
              onPress={this.submitUserReview}
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                color: rating ? '#d20000' : '#707070',
              }}>
              Submit
            </Text>
          )}
        </View>
      </View>
    );
  }

  render() {
    const {data} = this.props.route.params;
    return (
      <View style={{backgroundColor: '#F8F8F8', flex: 1}}>
        <Image
          source={{uri: data.restaurants.imageurl}}
          style={{
            height: height * 0.25,
            marginBottom: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width,
          }}
          resizeMode="cover">
          <Ionicons
            name="md-arrow-back"
            onPress={() => this.props.navigation.goBack()}
            color="#fff"
            size={35}
            style={{marginTop: 45, marginLeft: 15}}
          />
          <View style={styles.restaurantRating}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 19,
                color: '#000',
              }}>
              {data.restaurants.rating}
            </Text>
            <Ionicons
              name="ios-star"
              color="#000"
              size={20}
              style={{marginLeft: 5}}
            />
          </View>
        </Image>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 25,
                textAlign: 'center',
                color: '#000',
              }}>
              {data.restaurants.name}
            </Text>
            {data.cancelled ? (
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  textAlign: 'center',
                  color: '#d20000',
                }}>
                {'Reservation Cancelled'}
              </Text>
            ) : null}
            <View
              style={{
                backgroundColor: '#d2d2d2',
                width: width * 0.95,
                marginTop: 5,
                marginBottom: 5,
                height: 1.5,
              }}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 18,
                opacity: 0.7,
                color: '#000',
              }}>
              {data.restaurants.city}
            </Text>
          </View>
          {this.renderReviewInput()}
          <Text
            style={{
              color: '#d20000',
              marginTop: 20,
              marginLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize: 18,
            }}>
            Reservation Details
          </Text>
          <View style={styles.reservationDetailsView}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 15,
                margin: 10,
              }}>
              {data.date}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 15,
                marginLeft: 10,
              }}>
              {data.timeDiscount.time}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 15,
                  color: '#000',
                }}>
                Discount Availed
              </Text>
              <View
                style={{
                  width: 40,
                  height: 35,
                  backgroundColor: '#fff',
                  marginLeft: 15,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#d20000',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    color: '#d20000',
                  }}>
                  {data.timeDiscount.discount}%
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              color: '#d20000',
              marginTop: 20,
              marginLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize: 18,
            }}>
            Personal Details
          </Text>
          <View style={styles.personalDetailsView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Feather name="user" color="#000" size={18} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: '#000',
                  marginLeft: 10,
                }}>
                {data.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Feather name="phone" color="#000" size={18} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: '#000',
                  marginLeft: 10,
                }}>
                {data.mobile}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              }}>
              <Feather name="users" color="#000" size={18} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: '#000',
                  marginLeft: 10,
                }}>
                {data.people} Members
              </Text>
            </View>
          </View>
          <View style={{marginBottom: 100}} />
        </ScrollView>
      </View>
    );
  }
}

export default PastDetails;

const styles = StyleSheet.create({
  restaurantRating: {
    height: 38,
    width: 60,
    marginTop: 45,
    opacity: 0.8,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reservationDetailsView: {
    marginTop: 5,
    shadowColor: '#00000029',
    shadowOffset: {height: 2, width: 2},
    shadowRadius: 7,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOpacity: 1,
    width: width * 0.96,
    alignSelf: 'center',
  },
  personalDetailsView: {
    marginTop: 5,
    shadowColor: '#00000029',
    shadowOffset: {height: 2, width: 2},
    shadowRadius: 7,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOpacity: 1,
    width: width * 0.96,
    alignSelf: 'center',
  },
  rateButton: {
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    elevation: 5,
    borderColor: '#d20000',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  rateButtonText: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: '#d20000',
  },
  reviewInputView: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  reviewInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingVertical: 0,
    color: '#404040',
    minHeight: 70,
    textAlignVertical: 'top',
    textAlign: 'justify',
    borderBottomWidth: 1,
    borderColor: '#B0B0B0',
    marginBottom: 10,
  },
  submitButtonView: {
    alignSelf: 'center',
    marginTop: 5,
    overflow: 'hidden',
    height: 45,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
