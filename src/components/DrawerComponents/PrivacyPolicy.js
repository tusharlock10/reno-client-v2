import React, {Component} from 'react';
import {Text, View, SafeAreaView, ActivityIndicator, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
import {width} from '../../constants';
import {getMiscData} from '../../actions/misc';

class PrivacyPolicy extends Component {
  componentDidMount() {
    this.props.getMiscData();
  }

  render() {
    const {loading, misc, error} = this.props.misc;

    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={32} color={'#707070'} />
        </View>
      );
    }

    return (
      <ScrollView style={{flexGrow: 1, backgroundColor: '#fff', paddingHorizontal:10}}>
        <View
          style={{
            width,
            height: 55,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Ionicons
            name="md-arrow-back"
            onPress={() => this.props.navigation.goBack()}
            color="#000"
            size={28}
            style={{marginLeft: 15}}
          />
          <Text
            style={{
              marginLeft: 10,
              fontFamily: 'Poppins-Medium',
              color: '#000',
              fontSize: 25,
            }}>
            Privacy Policy
          </Text>
        </View>
        <HTMLView value={misc.fup}/>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({misc}) => ({misc});

export default connect(mapStateToProps, {getMiscData})(PrivacyPolicy);
