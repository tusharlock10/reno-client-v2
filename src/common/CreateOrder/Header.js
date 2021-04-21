import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({name, navigation, acceptsRenoPay}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerInnerView}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={24} color={'#404040'} />
        </TouchableOpacity>

        <Text style={styles.text}>{name}</Text>
      </View>
      {acceptsRenoPay ? (
        <View style={styles.renoPayView}>
          <Text style={styles.renoPayText}>Reno Pay</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    elevation: 7,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#404040',
    marginLeft: 10,
  },
  renoPayView: {
    backgroundColor: '#299e49',
    borderRadius: 7,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  renoPayText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
});
