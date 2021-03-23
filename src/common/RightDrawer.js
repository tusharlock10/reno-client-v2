import React, {Component} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Image from 'react-native-fast-image';
import {connect} from 'react-redux';
import {width} from '../constants';
import Ripple from 'react-native-material-ripple';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class DrawerItems extends Component {
  render() {
    return (
      <Ripple
        style={{height: 55, width, justifyContent: 'center'}}
        onPress={() => {
          this.props.navigation.closeDrawer();
          this.props.navigation.navigate(this.props.screen);
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: '#000',
            marginLeft: '10%',
            fontSize: 17,
          }}>
          {this.props.name}
        </Text>
      </Ripple>
    );
  }
}

class RightDrawer extends Component {
  render() {
    return (
      <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: '#d20000'}} />
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View
            style={{
              width: '100%',
              height: 88,
              backgroundColor: '#d20000',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 45 / 2,
                shadowColor: '#000',
                shadowRadius: 2,
                shadowOpacity: 0.4,
                marginLeft: 24,
                shadowOffset: {height: 1, width: 1},
              }}>
              <Image
                source={{uri: this.props.auth.user.profileImage}}
                style={{
                  height: 45,
                  width: 45,
                  borderWidth: 2,
                  borderColor: '#fff',
                  borderRadius: 45 / 2,
                }}
                resizeMode="cover"
              />
            </View>
            <Text
              style={{
                marginLeft: 20,
                fontFamily: 'Poppins-Medium',
                color: '#fff',
                fontSize: 24,
              }}>
              {`${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`}
            </Text>
          </View>
          <View style={{marginTop: 40}}>
            <DrawerItems
              name="My Account"
              navigation={this.props.navigation}
              screen="MyAccountScreen"
            />
            <DrawerItems
              name="About Us"
              navigation={this.props.navigation}
              screen="AboutUsScreen"
            />
            <DrawerItems
              name="Privacy Policy"
              navigation={this.props.navigation}
              screen="PrivacyPolicyScreen"
            />
            <DrawerItems
              name="FAQ"
              navigation={this.props.navigation}
              screen="FAQScreen"
            />
            <DrawerItems
              name="Support"
              navigation={this.props.navigation}
              screen="SupportScreen"
            />
          </View>
          <Image
            source={require('../../assets/PassMain.png')}
            style={{width: '100%', height: 200, marginTop: 60}}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              this.props.navigation.replace('LoginScreen');
            }}
            style={{
              width,
              flexDirection: 'row',
              position: 'absolute',
              bottom: 20,
              marginBottom: 10,
              left: 20,
            }}>
            <MaterialCommunityIcons
              name="logout"
              size={25}
              color="#000"
              style={{marginLeft: 10}}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
                color: '#000',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps)(RightDrawer);
