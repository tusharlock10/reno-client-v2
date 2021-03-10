import React, { Component } from "react";
import { Text, View, StyleSheet, Modal as RNModal } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ripple from "react-native-material-ripple";
import Modal from "react-native-modal";
import CustomDatePicker from "../CustomDatePicker";
import { BlurView } from "@react-native-community/blur";

getDate = daysToAdd => {
  var someDate = new Date();
  someDate.setDate(someDate.getDate() + daysToAdd);
  return someDate;
};

var todayDate = getDate(0).getDate();
var todayTimeStamp = getDate(0).getTime();
var todayMonth = getDate(0).getMonth();

var tomorrowDate = getDate(1).getDate();
var tomorrowTimeStamp = getDate(1).getTime();
var tomorrowMonth = getDate(1).getMonth();

var dayAfterTomDate = getDate(2).getDate();
var dayAfterTimeStamp = getDate(2).getTime();
var dayAfterTomMonth = getDate(2).getMonth();

var day = getDate(2).getDay();

function getMonth(month) {
  if (month == 0) {
    month = "Jan";
  } else if (month == 1) {
    month = "Feb";
  } else if (month == 2) {
    month = "Mar";
  } else if (month == 3) {
    month = "Apr";
  } else if (month == 4) {
    month = "May";
  } else if (month == 5) {
    month = "Jun";
  } else if (month == 6) {
    month = "Jul";
  } else if (month == 7) {
    month = "Aug";
  } else if (month == 8) {
    month = "Sep";
  } else if (month == 9) {
    month = "Oct";
  } else if (month == 10) {
    month = "Nov";
  } else if (month == 11) {
    month = "Dec";
  }

  return month;
}

function getDay(day) {
  if (day == 0) {
    day = "Sunday";
  } else if (day == 1) {
    day = "Monday";
  } else if (day == 2) {
    day = "Tuesday";
  } else if (day == 3) {
    day = "Wednesday";
  } else if (day == 4) {
    day = "Thursday";
  } else if (day == 5) {
    day = "Friday";
  } else if (day == 6) {
    day = "Saturday";
  }
  return day;
}

class DateSlot extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Ripple
        rippleDuration={200}
        onPress={this.props.onPress}
        style={{
          width: "23%",
          height: 60,
          backgroundColor: this.props.isSelected ? "#d20000" : "#E9E9E9",
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            color: this.props.isSelected ? "#fff" : "#000",
            fontSize: 13
          }}
        >
          {this.props.day}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            color: this.props.isSelected ? "#fff" : "#000",
            fontSize: 13,
            marginTop: 4
          }}
        >
          {this.props.date}
        </Text>
      </Ripple>
    );
  }
}
class DateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTodaySelected: true,
      isTomorrowSelected: false,
      isDayAfterTomorrowSelected: false,
      isCustomDateSelected: false,
      showDatePicker: false,
      timeStamp: null
    };
  }

  render() {
    var customDate = new Date(this.state.timeStamp).toDateString();
    return (
      <View style={{ margin: 15 }}>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            color: "#000000",
            fontSize: 17,
            marginBottom: 5,
            marginLeft: 8
          }}
        >
          What Day?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <DateSlot
            day="Today"
            date={`${todayDate} ${getMonth(todayMonth)}`}
            isSelected={this.state.isTodaySelected}
            onPress={() => {
              this.setState({
                isTodaySelected: true,
                isTomorrowSelected: false,
                isDayAfterTomorrowSelected: false,
                isCustomDateSelected: false
              });
              this.props.callbackFromMainCalendar(todayTimeStamp);
            }}
          />
          <DateSlot
            day="Tomorrow"
            date={`${tomorrowDate} ${getMonth(tomorrowMonth)}`}
            isSelected={this.state.isTomorrowSelected}
            onPress={() => {
              this.setState({
                isTodaySelected: false,
                isTomorrowSelected: true,
                isDayAfterTomorrowSelected: false,
                isCustomDateSelected: false
              });
              this.props.callbackFromMainCalendar(tomorrowTimeStamp);
            }}
          />
          <DateSlot
            day={getDay(day)}
            date={`${dayAfterTomDate} ${getMonth(dayAfterTomMonth)}`}
            isSelected={this.state.isDayAfterTomorrowSelected}
            onPress={() => {
              this.setState({
                isTodaySelected: false,
                isTomorrowSelected: false,
                isDayAfterTomorrowSelected: true,
                isCustomDateSelected: false
              });
              this.props.callbackFromMainCalendar(dayAfterTimeStamp);
            }}
          />
          <Ripple
            rippleDuration={200}
            onPress={() =>
              this.setState({
                isTodaySelected: false,
                isTomorrowSelected: false,
                isDayAfterTomorrowSelected: false,
                isCustomDateSelected: true,
                showDatePicker: true
              })
            }
            style={{
              width: "23%",
              height: 60,
              backgroundColor: this.state.isCustomDateSelected
                ? "#d20000"
                : "#E9E9E9",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={25}
              color={this.state.isCustomDateSelected ? "#fff" : "#000"}
            />
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                color: this.state.isCustomDateSelected ? "#fff" : "#000",
                fontSize: 13,
                marginTop: 3
              }}
            >
              {this.state.timeStamp == null
                ? getMonth(todayMonth)
                : `${customDate.slice(8, 10)} ${customDate.slice(4, 7)}`}
            </Text>
          </Ripple>
        </View>
        <RNModal
          transparent
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center"
          }}
          animationType="fade"
          visible={this.state.showDatePicker}
        >
          <BlurView style={styles.absolute} blurType="light" blurAmount={2} />
          <CustomDatePicker
            callbackFromCalendar={timeStamp => {
              if (timeStamp != null) {
                this.setState({ timeStamp, showDatePicker: false });
                this.props.callbackFromMainCalendar(timeStamp);
              } else if (timeStamp == null && this.state.timeStamp == null) {
                this.setState({
                  showDatePicker: false,
                  isTodaySelected: true,
                  isTomorrowSelected: false,
                  isDayAfterTomorrowSelected: false,
                  isCustomDateSelected: false
                });
                this.props.callbackFromMainCalendar(todayTimeStamp);
              } else if (timeStamp == null) {
                this.setState({ showDatePicker: false });
              }
            }}
          />
        </RNModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
export default DateComponent;
