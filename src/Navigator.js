import { createStackNavigator } from 'react-navigation';
import Proposals from './pages/Proposals';
import Orders from './pages/Orders';
import Pay from './pages/Pay';
import ChangePassword from './pages/ChangePassword';
import Invoices from './pages/Invoices'; 
import ProposalReview from './pages/ProposalReview';
import ProposalWebView from './pages/ProposalWebView';
import Login from './pages/Login';
import WPWorkSheet from './pages/WPWorkSheet'
import EPWorkSheet from './pages/EPWorkSheet'
import WVWorkSheet from './pages/WVWorkSheet'



const RootNavigator = createStackNavigator({
	ProposalList: {
      screen: Proposals,
      navigationOptions: {
        header: null,
      }
    },
    review:{
      screen:ProposalReview,
      navigationOptions:{
        header:null
      }
    },
    webView:{
      screen:ProposalWebView,
      navigationOptions:{
        header:null
      }
    },
    Login:{
      screen:Login,
      navigationOptions:{
        header:null
      }
    },
    OrderList: {
      screen: Orders,
      navigationOptions: {
        header: null,
      }
    },
    invoice:{
      screen:Invoices,
      navigationOptions:{
        header:null
      }
    },
    pay:{
      screen:Pay,
      navigationOptions:{
        header:null
      }
    },
    ChangePassword:{
      screen:ChangePassword,
      navigationOptions: {
        header: null,
      }
  
    },
    WPWorkSheet:{
      screen:WPWorkSheet,
      navigationOptions: {
        header: null,
      }
    },
    EPWorkSheet:{
      screen:EPWorkSheet,
      navigationOptions: {
        header: null,
      }
    },
    WVWorkSheet:{
      screen:WVWorkSheet,
      navigationOptions: {
        header: null,
      }
    }

},{
    initialRouteName:'Login',
});
export default RootNavigator;
