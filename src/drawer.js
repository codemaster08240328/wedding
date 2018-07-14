import React from 'react';

import { createStackNavigator, createDrawerNavigator, DrawerNavigator,DrawerItems} from 'react-navigation';
import Proposals from './pages/Proposals';
import Orders from './pages/Orders';
import Pay from './pages/Pay';
import ArchivedOrders from './pages/ArchivedOrders';
import UpdateCreditCard from './pages/UpdateCreditCard';
import ChangePassword from './pages/ChangePassword';
import Invoices from './pages/Invoices'; 
import Logout from './pages/Logout';
import ProposalReview from './pages/ProposalReview';
import ProposalWebView from './pages/ProposalWebView';
import {
  StyleSheet, 
  Text, 
  View, 
  Button,
  Image,
  TouchableOpacity } from 'react-native';

const customDrawerContent = (props)=>(
  <View style = {{flex:1}}>
    <View style = {styles.drawbody}>
      <DrawerItems 
        {...props}
        getLabel = {(scene) => (
          <View style={styles.button}>
            <Text style={styles.buttonText}>{props.getLabel(scene)}</Text>
          </View>
        )}/>
    </View>
  </View>
);

const Order = createStackNavigator({
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
  }
},
{
  initialRouteName: 'OrderList'
});

const Proposal = createStackNavigator({
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
  }

},
{
  initialRouteName: 'ProposalList'
});

const drawer = createDrawerNavigator({
  Proposals:{
    screen:Proposal,
    navigationOptions: {
      header: null,
      drawerLabel: "My Proposals"
    }
    
  },
  OpenOrders:{
    screen:Order,
    navigationOptions: {
      header: null,
      drawerLabel: "My Orders"
    }

  },
  UpdateCreditCard:{
    screen:UpdateCreditCard,
    navigationOptions: {
      header: null,
      drawerLabel: "Revalidate Credit Card"
    }

  },
  ArchivedOrders:{
    screen:ArchivedOrders,
    navigationOptions: {
      header: null,
      drawerLabel: "Help"
    }

  },
  ChangePassword:{
    screen:ChangePassword,
    navigationOptions: {
      header: null,
      drawerLabel: "Change Password"
  }

  },
  Logout:{
    screen:Logout,

  },

},{
    drawerPosition: "right",
    drawerWidth: 160,
    initialRouteName:'Proposals',
    contentComponent:customDrawerContent,
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle'
});
const styles = StyleSheet.create({
  drawheader:{
    paddingLeft:20,
    paddingRight:20,
    flex:3,
    justifyContent:'center',
    alignItems:'center',
  },
  drawbody:{
    flex:7,
    backgroundColor:'#FA606A',
    paddingTop:20,
  },
  logo:{


  },
  button:{
    
    width:160,
    height:30,
    borderBottomWidth:1,
    borderColor:'#FC808A',
    justifyContent:'center',

  },
  buttonText:{
    paddingLeft:10,
    color:'#fefefe',
  }

});

export default drawer;


