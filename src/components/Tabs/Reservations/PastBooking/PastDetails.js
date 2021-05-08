import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Image from 'react-native-fast-image';
import {Snackbar} from 'react-native-paper';
import {height, width} from '../../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import axios from '../../../../api';
import {getDayFromNumber} from '../../../../utils/dateTimeUtils';
import moment from 'moment';

class PastDetails extends Component {
  state = {
    rating: 0,
    review: '',
    reviewId: null,
    loadingReview: true,
    isReviewActive: false,
    submitLoading: false,
    updateReview: false,
    showInfo: false,
    submitError: false,
  };

  componentDidMount() {
    if (this.props.route.params.data.confirmed) {
      this.getUserReview();
    }
  }

  async getUserReview() {
    const restaurantId = this.props.route.params.data.restaurants.id;
    const {data} = await axios.get(`/restaurant/${restaurantId}/review/user`);
    if (data) {
      this.setState({
        loadingReview: false,
        rating: data.rating,
        review: data.review,
        reviewId: data.id,
        isReviewActive: true,
        updateReview: true,
      });
    } else {
      this.setState({
        loadingReview: false,
      });
    }
  }

  submitUserReview = async () => {
    const {data} = this.props.route.params;
    const {rating, review, reviewId} = this.state;
    if (!rating) {
      return;
    }

    this.setState({submitLoading: true});
    try {
      const {data: _data} = await axios.post(
        `/restaurant/${data.restaurants.id}/review`,
        {
          review,
          rating,
          reviewId,
        },
      );
      this.setState({
        reviewId: _data.id,
        updateReview: true,
        showInfo: true,
        submitError: false,
      });
    } catch (e) {
      this.setState({
        showInfo: true,
        submitError: true,
      });
    }
    this.setState({submitLoading: false});
  };

  renderReviewInput() {
    if (!this.props.route.params.data.confirmed) {
      return null;
    }
    const {isReviewActive, rating, review, loadingReview} = this.state;

    if (loadingReview) {
      return (
        <ActivityIndicator
          color={'#d20000'}
          size={28}
          style={{marginVertical: 10}}
        />
      );
    }

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
              {this.state.updateReview ? 'Update Review' : 'Submit Review'}
            </Text>
          )}
        </View>
      </View>
    );
  }

  render() {
    const {data} = this.props.route.params;
    const discountProperty =
      getDayFromNumber(new Date(data.date).getDay()).substring(0, 3) +
      'Discount';

    let updateText;
    if (data.confirmed) {
      updateText = 'Paid on ';
    } else if (data.cancelled) {
      updateText = 'Cancelled on ';
    } else if (data.hasPaymentDispute) {
      updateText = 'Marked Disputed on ';
    } else if (data.unlockActive) {
      updateText = 'Unlocked on ';
    } else {
      updateText = 'Updated on ';
    }

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
            {data.confirmed ? (
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  textAlign: 'center',
                  color: 'green',
                }}>
                {'Reservation Completed'}
              </Text>
            ) : data.cancelled ? (
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  textAlign: 'center',
                  color: '#d20000',
                }}>
                {'Reservation Cancelled'}
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  textAlign: 'center',
                  color: '#d20000',
                }}>
                {'Deal Not Unlocked'}
              </Text>
            )}
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
                fontSize: 16,
                margin: 10,
                marginBottom: 0,
              }}>
              {'Created on '}
              <Text
                style={{
                  color: '#d20000',
                }}>
                {moment(data.date).format('Do MMM YY, h:mm A')}
              </Text>
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 16,
                margin: 10,
              }}>
              {updateText}
              <Text
                style={{
                  color: '#d20000',
                }}>
                {moment(data.updatedAt).format('Do MMM YY, h:mm A')}
              </Text>
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 16,
                marginLeft: 10,
              }}>
              {'Reservation Slot '}
              <Text
                style={{
                  color: '#d20000',
                }}>
                {data.timeDiscount.time}
              </Text>
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                color: '#000',
                margin: 10,
              }}>
              {'Discount Availed '}
              <Text
                style={{
                  color: '#d20000',
                }}>
                {data.timeDiscount[discountProperty]}%
              </Text>
            </Text>
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
                  color: '#d20000',
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
                  color: '#d20000',
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
                  color: '#d20000',
                  marginLeft: 10,
                }}>
                {data.people} Member{`${data.people === 1 ? '' : 's'}`}
              </Text>
            </View>
          </View>
          <View style={{marginBottom: 100}} />
        </ScrollView>
        <Snackbar
          visible={this.state.showInfo}
          theme={{colors: {accent: 'white'}}}
          duration={3000}
          style={{
            position: 'absolute',
            bottom: 0,
            elevation: 10,
            backgroundColor: this.state.submitError ? '#d20000' : '#299e49',
            height: 55,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 5,
          }}
          onDismiss={() => this.setState({showInfo: false})}>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: 'Poppins-Medium',
              color: '#fff',
            }}>
            {this.state.submitError
              ? 'Error in submitting review'
              : 'Review Submitted'}
          </Text>
        </Snackbar>
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
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
    elevation: 5,
  },
  personalDetailsView: {
    marginTop: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
    elevation: 5,
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
    elevation: 7,
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
    paddingHorizontal: 8,
    paddingTop: 15,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
