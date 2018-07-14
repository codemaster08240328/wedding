import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  AsyncStorage
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {setAuth} from '../actions/auth'
import LogoComponent from '../components/LogoComponent';
import NavBar from '../components/NavBar';
import Error from '../components/Error';
import Form from '../components/Form';

import okIcon from '../assets/ok-icon-animation.gif';
import { connect } from 'react-redux';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      loginSuccess:"init",
      isloading:false,
    }
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.spinStart = this.spinStart.bind(this);
  }
  componentDidMount(){
    this.getSession();
    
    
  }
  componentWillReceiveProps(nextProps){
    if(!this.props.auth.loggedIn&&nextProps.auth.loggedIn){
      this.handleSuccess();
    }else{
      this.setState({
        isloading:false
      })
    }
  }
  
  getSession = async()=>{
    const cust_id = await AsyncStorage.getItem('cust_id');
    const cust_fname = await AsyncStorage.getItem('cust_fname');
    const cust_addr1 = await AsyncStorage.getItem('address');
    const cust_zip = await AsyncStorage.getItem('cust_zip');
    const cust_wed_date = await AsyncStorage.getItem('cust_wed_date');

    var data = {
      'cust_id':cust_id,
      'cust_fname':cust_fname,
      'cust_addr1':cust_addr1,
      'cust_zip':cust_zip,
      'cust_wed_date':cust_wed_date
    }
    console.log("data",data);
    if(data.cust_id!=null){
      this.props.dispatch(setAuth(data))
    }
    
  }

  handleError(res){
    this.setState({isloading:false});
    switch(res){
      case "email":
      this.setState({
        loginSuccess:"email"
      });
      break;
      case "pwd":
      this.setState({
        loginSuccess:"pwd"
      });
      break;
      case 'fail':
      this.setState({
        loginSuccess:'fail',
        isloading:false
      })
      default:
      break;
    }
    
  }
  spinStart(){
    this.setState({isloading:true});
  }
  handleSuccess(){  
      this.setState({isloading:false});
      setTimeout(()=>{ this.props.navigation.navigate('OrderList') }, 4000);
  }
    
    render() {
      return (
       <View style = {styles.container}>
        <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <LogoComponent ></LogoComponent>
        <NavBar  title="Customer Login" back_have={false} menu={true}></NavBar>
        <View style = {styles.body}>
          
          {(this.state.loginSuccess=="email")&&<View style = {{height:65}}><Error msg = 'You have to input valid email'></Error></View>}
          {(this.state.loginSuccess=="fail")&&<View style = {{height:65}}><Error msg = 'Login Failed'></Error></View>}
          {(this.state.loginSuccess=="pwd")&&<View style = {{height:65}}><Error msg = 'You have to input password'></Error></View>}
          
          {(!this.props.auth.loggedIn)&&<Form successHandle={this.handleSuccess} errorHandle = {this.handleError} spinner = {this.spinStart}></Form>}
          
          {(this.props.auth.loggedIn)&&
            <View style = {{alignItems:'center'}} >

              <Image
                style = {{height:200,width:200}}
                source = {okIcon}
              />

              <Text style = {{fontSize:20}}>Login Successful!</Text>
              <Text>Please Wait.</Text>
              
            </View>}
        </View>
       </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 3,
      alignItems: 'center',
      backgroundColor:'white',
    },
    
    body:{
      flex:7
    }
});
function mapStateToProps(state){
  return {auth:state.auth}
}
export default connect(mapStateToProps)(Login)