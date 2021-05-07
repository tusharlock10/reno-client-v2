import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import Ripple from 'react-native-material-ripple';
class Slots extends Component {
  render() {
    return (
      <View>
        <Ripple
          rippleDuration={300}
          style={{
            width: 50,
            height: 50,
            marginLeft: 10,
            marginTop: 20,
            marginRight: 10,
          }}
          onPress={
            this.props.exhausted
              ? null
              : () => {
                  this.props.callbackFromChild(
                    this.props.discount,
                    this.props.time,
                    this.props.id,
                  );
                }
          }>
          <View style={styles.twelvePointBurst}>
            <View
              style={[
                styles.twelvePointBurstMain,
                {backgroundColor: this.props.backgroundColor},
              ]}
            />
            <View
              style={[
                styles.twelvePointBurst30,
                {backgroundColor: this.props.backgroundColor},
              ]}
            />
            <View
              style={[
                styles.twelvePointBurst60,
                {backgroundColor: this.props.backgroundColor},
              ]}>
              {this.props.exhausted ? (
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 8,
                    color: '#fff',
                    transform: [{rotate: '-120deg'}],
                  }}>
                  EXHAUSTED
                </Text>
              ) : (
                <View style={{transform: [{rotate: '-60deg'}]}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      fontFamily: 'Poppins-Regular',
                      color: '#fff',
                    }}>
                    {this.props.time.slice(0, 5)}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 17,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#fff',
                    }}>
                    {this.props.discount}%
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Ripple>
      </View>
    );
  }
}
const styles = {
  twelvePointBurst: {},
  twelvePointBurstMain: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#d20000',
  },
  twelvePointBurst30: {
    width: 48,
    height: 48,
    borderRadius: 4,
    position: 'absolute',
    backgroundColor: '#d20000',
    top: 0,
    left: 0,
    transform: [{rotate: '30deg'}],
  },
  twelvePointBurst60: {
    width: 48,
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#d20000',
    top: 0,
    left: 0,
    transform: [{rotate: '60deg'}],
  },
};

export default Slots;
