import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({text, onBack, textStyle, style, backIconColor}) => {
  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onBack}>
        <Ionicons
          name={'arrow-back'}
          size={24}
          color={backIconColor || '#404040'}
        />
      </TouchableOpacity>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 7,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#404040',
    marginLeft: 10,
  },
});
