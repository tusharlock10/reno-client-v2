import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../components/LoginScreen';

// import Tabs from "./TabNavigator";
import Tabs from './HomeNavigator';
import SplashScreen from '../components/SplashScreen';
import UpcomingDetails from '../components/Tabs/Reservations/UpcomingBooking/UpcomingDetails';
import PastDetails from '../components/Tabs/Reservations/PastBooking/PastDetails';
import CreateOrders from '../common/CreateOrder';
import ChooseLocation from '../common/ChooseLocation';
import OTPScreen from '../common/OTPScreen';
import SearchScreen from '../common/SearchScreen';
import RenoPassScreen from '../common/RenoPassScreen/RenoPassScreen';
import MyAccount from '../components/DrawerComponents/MyAccount';
import PaymentScreen from '../common/PaymentGateway';
import QRSearchScreen from '../common/QRSearchScreen';
import EnterAmountScreen from '../common/QRSearchScreen/EnterAmountScreen';
import AboutUs from '../components/DrawerComponents/AboutUs';
import FAQScreen from '../components/DrawerComponents/FAQ';
import PrivacyPolicy from '../components/DrawerComponents/PrivacyPolicy';
import BookingConfirmation from '../common/BookingConfirmation';
import TypeScreen from '../common/SearchScreen/TypeScreen';
import Support from '../components/DrawerComponents/Support';
import BrandTileRestaurants from '../components/Tabs/Home/BrandTileRestaurants';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
      path: 'main',
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        gesturesEnabled: false,
      },
      path: 'mainTabs',
    },
    /*
      NOTE: UpcomingDetails is declared here to hide tab bar on push
   */
    UpcomingDetails: {
      screen: UpcomingDetails,
      path: 'upcomingOrders',
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    PastDetails: {
      screen: PastDetails,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    CreateOrders: {
      screen: CreateOrders,
      navigationOptions: {
        gesturesEnabled: false,
      },
      path: 'orders',
    },
    ChooseLocation: {
      screen: ChooseLocation,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    OTPScreen: {
      screen: OTPScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    RenoPassScreen: {
      screen: RenoPassScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    MyAccount: {
      screen: MyAccount,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    PaymentGateway: {
      screen: PaymentScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    QRSearchScreen: {
      screen: QRSearchScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    EnterAmountScreen: {
      screen: EnterAmountScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    AboutUs: {
      screen: AboutUs,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    FAQScreen: {
      screen: FAQScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    BookingConfirmation: {
      screen: BookingConfirmation,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    TypeScreen: {
      screen: TypeScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Support: {
      screen: Support,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    BrandTileRestaurants: {
      screen: BrandTileRestaurants,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  },
);

export default createAppContainer(AppNavigator);
