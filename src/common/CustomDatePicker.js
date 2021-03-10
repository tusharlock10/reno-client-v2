import React, { Component } from "react";
import { Text, View, Platform, TouchableOpacity } from "react-native";
import { width, height } from "../constants";
import { Calendar } from "react-native-calendars";
import Ripple from "react-native-material-ripple";

nextDate = daysToAdd => {
  var someDate = new Date();
  someDate.setDate(someDate.getDate() + daysToAdd);
  return someDate;
};

var dateToday = nextDate(0).getDate();
var currentYear = nextDate(0).getFullYear();
var currentMonth = nextDate(0).getMonth() + 1;

var lastDate = nextDate(6).getDate();
var lastYear = nextDate(6).getFullYear();
var lastMonth = nextDate(6).getMonth() + 1;

if (dateToday < 10) {
  dateToday = "0" + dateToday;
}
if (currentMonth < 10) {
  currentMonth = "0" + currentMonth;
}
if (lastDate < 10) {
  lastDate = "0" + lastDate;
}
if (currentMonth < 10) {
  currentMonth = "0" + currentMonth;
}

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.today = `${currentYear}-${currentMonth}-${dateToday}`;
    this.last = `${lastYear}-${lastMonth}-${lastDate}`;
    this.timeStamp = new Date().getTime();
    this.state = {
      selectedDate: this.today,
      timeStamp: this.timeStamp
    };
  }

  render() {
    return (
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          top: height / 3.5,
          shadowColor: "#00000029",
          shadowOffset: { height: 5, width: 5 },
          shadowOpacity: 1,
          elevation: 7,
          shadowRadius: 10
        }}
      >
        <Calendar
          style={{ width: width * 0.9 }}
          markedDates={{
            [this.state.selectedDate]: {
              selected: true,
              selectedColor: "#d20000"
            }
          }}
          onDayPress={day => {
            console.log(day);
            this.setState({
              selectedDate: day.dateString,
              timeStamp: day.timestamp
            });
          }}
          minDate={this.today}
          maxDate={this.last}
          theme={calendarTheme}
          hideArrows={false}
        />
        <View
          style={{
            height: 70,
            width: width * 0.9,
            backgroundColor: "#fff",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-end",
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() =>
              this.props.callbackFromCalendar(this.state.timeStamp)
            }
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 15,
                color: "#d20000",
                margin: 7
              }}
            >
              OK
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => this.props.callbackFromCalendar(null)}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 15,
                color: "#d20000",
                margin: 7
              }}
            >
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const calendarTheme = {
  calendarBackground: "#fff",
  monthTextColor: "#000",
  arrowColor: "#000",
  "stylesheet.calendar.header": {
    header: {
      backgroundColor: "#FFE59F",
      flexDirection: "row",
      justifyContent: "space-between",
      height: 55,
      alignItems: "center",
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7
    },
    monthText: {
      fontFamily: "Poppins-Regular",
      fontSize: 15,
      margin: 10,
      textTransform: "uppercase"
    },
    week: {
      marginTop: 7,
      marginBottom: 7,
      flexDirection: "row",
      justifyContent: "space-around"
    },
    dayHeader: {
      color: "#d20000",
      fontFamily: "Poppins-Regular",
      fontSize: 14
    }
  },
  "stylesheet.calendar.main": {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 7,
      backgroundColor: "#fff"
    },
    week: {
      marginTop: 4,
      marginBottom: 4,
      flexDirection: "row",
      justifyContent: "space-around"
    }
  },
  "stylesheet.day.basic": {
    text: {
      fontFamily: "Poppins-Regular",
      marginTop: Platform.OS === "android" ? 4 : 6,
      fontSize: 14
    },
    todayText: {
      color: "#299e49"
    },
    disabledText: {
      color: "#D2D2D2"
    },
    selected: {
      backgroundColor: "#d20000",
      borderRadius: 16,
      shadowColor: "#00000029",
      shadowOffset: { height: 3, width: 3 },
      shadowOpacity: 1,
      shadowRadius: 7,
      elevation: 7,
      marginBottom: 7
    }
  }
};
export default CustomDatePicker;
