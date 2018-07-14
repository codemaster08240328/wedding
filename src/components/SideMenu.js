import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import {appInitialized} from '../actions/auth';



const window = Dimensions.get('window');
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    // width: window.width,
    height: window.height,
    backgroundColor:'#FA606A',
  },
  avatar:{
    marginLeft:10,
    fontSize:20,
  },
  search:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#E7E7E7',
    height:50,
    paddingLeft:10

    

  },
  name: {
    paddingLeft:10,
    marginLeft:10,
    width:195,
    backgroundColor:"#BDBCBC",
    borderRadius:3,
    height:30,
    paddingTop:5,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

class Menu extends Component {
  logout = async()=>{
    await AsyncStorage.removeItem('cust_id');
    await AsyncStorage.removeItem('cust_fname');
    await AsyncStorage.removeItem('cust_zip');
    await AsyncStorage.removeItem('address');
    await AsyncStorage.removeItem('cust_wed_date');

    this.props.dispatch(appInitialized());
    this.props.props.navigation.navigate("Login");
  }
  render(){
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
          <View style={{flex:2}}></View>
        <View style = {{flex:10,}}>
          <TouchableOpacity onPress={() => this.props.onItemSelected('ProposalList')} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,marginTop:25,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
              <Icon size={17} name = "star"  color="#fff"/>
              <Text style = {{paddingLeft:5, color:'white'}}>My Proposals</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onItemSelected('OrderList')} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
              <Icon size={17} name = "heart" type="material-community" color="#fff"/>
              <Text style = {{paddingLeft:5, color:'white'}}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>this.props.onItemSelected('ChangePassword')} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
              <Icon size={17} name = "account-key" type="material-community" color="#fff"/>
              <Text style = {{paddingLeft:5, color:'white'}}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}} onPress={this.logout}>
              <Icon size={17} name = "log-out" type="entypo" color="#fff"/>
              <Text style = {{paddingLeft:5, color:'white'}}>Logout</Text>
          </TouchableOpacity>
          
          
        </View>
      </ScrollView>
    );
  }
  
}

function mapStateToProps(state){
  return{state}
}

export default connect(mapStateToProps)(Menu)
