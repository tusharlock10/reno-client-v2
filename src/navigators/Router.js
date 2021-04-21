import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import BottomTab from '../components/Tabs/BottomTab';
import SplashScreen from '../components/SplashScreen';
import LoginScreen from '../components/LoginScreen';
import Home from '../components/Tabs/Home';
import FindAndDine from '../components/Tabs/FindAndDine';
import RenoPay from '../components/Tabs/RenoPay';
import Reservations from '../components/Tabs/Reservations';
import ChangeCity from '../components/Tabs/Home/ChangeCity';
// import FoodMasti from '../components/Tabs/FoodMasti';
import MyAccount from '../components/DrawerComponents/MyAccount';
import AboutUs from '../components/DrawerComponents/AboutUs';
import FAQScreen from '../components/DrawerComponents/FAQ';
import PrivacyPolicy from '../components/DrawerComponents/PrivacyPolicy';
import Support from '../components/DrawerComponents/Support';
import RightDrawer from '../common/RightDrawer';
import UpcomingDetails from '../components/Tabs/Reservations/UpcomingBooking/UpcomingDetails';
import PastDetails from '../components/Tabs/Reservations/PastBooking/PastDetails';
import CreateOrders from '../common/CreateOrder';
import ChooseLocation from '../common/ChooseLocation';
import OTPScreen from '../common/OTPScreen';
import SearchScreen from '../common/SearchScreen';
import RenoPassScreen from '../common/RenoPassScreen/RenoPassScreen';
import PaymentScreen from '../common/PaymentGateway';
import QRSearchScreen from '../common/QRSearchScreen';
import EnterAmountScreen from '../common/QRSearchScreen/EnterAmountScreen';
import BookingConfirmation from '../common/BookingConfirmation';
import TypeScreen from '../common/SearchScreen/TypeScreen';
import BrandTileRestaurants from '../components/Tabs/Home/BrandTileRestaurants';

//Create Navigators
const LoginStack = createStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const Tabs = createBottomTabNavigator();

const DrawerStack = createDrawerNavigator();

//Login Navigation
const LoginNavigator = () => {
  return (
    <LoginStack.Navigator headerMode="none">
      <LoginStack.Screen name={'SplashScreen'} component={SplashScreen} />
      <LoginStack.Screen name={'LoginScreen'} component={LoginScreen} />
      <MainStack.Screen name={'ChooseLocation'} component={ChooseLocation} />
    </LoginStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tabs.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <Tabs.Screen name={'Home'} component={Home} />
      <Tabs.Screen name={'Nearby'} component={FindAndDine} />
      <Tabs.Screen name={'RenoPay'} component={RenoPay} />
      <Tabs.Screen name={'Reservations'} component={Reservations} />
    </Tabs.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <DrawerStack.Navigator
      drawerType={'slide'}
      drawerPosition={'right'}
      drawerContent={(props) => <RightDrawer {...props} />}>
      <DrawerStack.Screen name={'Tabs'} component={TabNavigator} />

      <DrawerStack.Screen name={'MyAccount'} component={MyAccount} />
      <DrawerStack.Screen name={'AboutUs'} component={AboutUs} />
      <DrawerStack.Screen name={'FAQScreen'} component={FAQScreen} />
      <DrawerStack.Screen name={'PrivacyPolicy'} component={PrivacyPolicy} />
      <DrawerStack.Screen name={'Support'} component={Support} />
    </DrawerStack.Navigator>
  );
};

const MainNavigator = () => {
  // Main app navigator, used for screens that do not contain the drawer and displaying the
  // drawer navigator
  return (
    <MainStack.Navigator headerMode="none" screenOptions={{headerShown: false}}>
      {/* Drawer navigator */}
      <MainStack.Screen name={'Drawer'} component={DrawerNavigator} />

      {/* Individual Screens */}
      <MainStack.Screen name={'ChangeCity'} component={ChangeCity} />
      <MainStack.Screen name={'UpcomingDetails'} component={UpcomingDetails} />
      <MainStack.Screen name={'PastDetails'} component={PastDetails} />
      <MainStack.Screen name={'CreateOrders'} component={CreateOrders} />
      <MainStack.Screen name={'ChooseLocation'} component={ChooseLocation} />
      <MainStack.Screen name={'OTPScreen'} component={OTPScreen} />
      <MainStack.Screen name={'SearchScreen'} component={SearchScreen} />
      <MainStack.Screen name={'RenoPassScreen'} component={RenoPassScreen} />
      <MainStack.Screen name={'PaymentScreen'} component={PaymentScreen} />
      <MainStack.Screen name={'QRSearchScreen'} component={QRSearchScreen} />
      <MainStack.Screen
        name={'EnterAmountScreen'}
        component={EnterAmountScreen}
      />
      <MainStack.Screen
        name={'BookingConfirmation'}
        component={BookingConfirmation}
      />
      <MainStack.Screen name={'TypeScreen'} component={TypeScreen} />
      <MainStack.Screen
        name={'BrandTileRestaurants'}
        component={BrandTileRestaurants}
      />
    </MainStack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name={'Login'} component={LoginNavigator} />
      <RootStack.Screen name={'Main'} component={MainNavigator} />
    </RootStack.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Router;
