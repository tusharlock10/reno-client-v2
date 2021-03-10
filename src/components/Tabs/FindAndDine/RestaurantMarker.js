import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, Text, View } from "react-native";

class RestaurantMarker extends React.Component {
  render() {
    const { discount, selected, style } = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.bubble]}>
          <Text style={styles.discount}>{discount}% Off</Text>
        </View>
        <View style={[styles.arrowBorder]} />
        <View style={[styles.arrow]} />
      </View>
    );
  }
}

RestaurantMarker.propTypes = {
  discount: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start"
  },
  bubble: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#FF5A5F",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 3,
    borderColor: "#D23F44",
    borderWidth: 0.5
  },
  dollar: {
    color: "#fff",
    fontSize: 10
  },
  discount: {
    color: "#fff",
    fontSize: 15,
    fontFamily:'Poppins-Regular'
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 4,
    borderTopColor: "#FF5A5F",
    alignSelf: "center",
    marginTop: -9
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 4,
    borderTopColor: "#D23F44",
    alignSelf: "center",
    marginTop: -0.5
  },
  selectedBubble: {
    backgroundColor: "#4da2ab",
    borderColor: "#007a87"
  },
  selectedArrow: {
    borderTopColor: "#4da2ab"
  },
  selectedArrowBorder: {
    borderTopColor: "#007a87"
  }
});

export default RestaurantMarker;
