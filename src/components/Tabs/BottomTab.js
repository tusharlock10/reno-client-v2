import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {width} from '../../constants';

const ACTIVE_COLOR = '#d20000';
const INACTIVE_COLOR = '#a9a9a9';
const ICON_SIZE = 20;

class BottomTab extends Component {
  renderIcon(iconName, index, screen, name) {
    return (
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => {
          this.props.navigation.navigate(screen);
        }}>
        <Icon
          name={iconName}
          size={ICON_SIZE}
          color={
            this.props.state.index === index ? ACTIVE_COLOR : INACTIVE_COLOR
          }
        />
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            color:
              this.props.state.index === index ? ACTIVE_COLOR : INACTIVE_COLOR,
          }}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.BottomTabStyle}>
        {this.renderIcon('home', 0, 'Home', 'Home')}
        {this.renderIcon('map-pin', 1, 'Nearby', 'Nearby')}
        {this.renderIcon('dollar-sign', 2, 'RenoPay', 'Reno Pay')}
        {this.renderIcon('clipboard', 3, 'Reservations', 'Reservations')}
      </View>
    );
  }
}

export default BottomTab;

const styles = StyleSheet.create({
  BottomTabStyle: {
    width,
    paddingTop: 7,
    paddingBottom: 2,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 7,
    backgroundColor: '#fff',
  },
});
