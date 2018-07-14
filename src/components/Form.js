import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Keyboard } from 'react-native'; 

import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;



class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",//"testd@testd.com",//"creativecleo@yahoo.com",//"testd@testd.com",//"soumikdasgupta115566@malinator.com",//
            passwd:"",//"yXNH73Xm",
        }
        this.handlePress = this.handlePress.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.state.auth.loggedIn){

            this.props.successHandle();
    
        }else if(nextProps.state.auth.loggedIn==false){
            this.props.errorHandle('fail');
        }
    }

    handlePress(){
        var  validation = this.validate(this.state.email,this.state.passwd);
        Keyboard.dismiss();

        if (validation){
            this.props.spinner();
            this.props.dispatch(login(this.state.email,this.state.passwd));
        }
        
    }
    validate(email, pwd){
       
        if(email==""){
            this.props.errorHandle("email");
            return false;
        }else if(pwd==""){
            this.props.errorHandle("pwd");
            return false;

        }else{
            return true;
        }
        
    }


    render() {
      
      return (
       <View style = {styles.container}>
        
        <TextInput 
            style = {styles.input} 
            placeholder="EMAIL" 
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(email) => this.setState({email})}
            value = {this.state.email}
            />
        <TextInput 
            style = {styles.input} 
            placeholder="PASSWORD" 
            underlineColorAndroid='rgba(0,0,0,0)'
            secureTextEntry = {true}
            onChangeText={(passwd) => this.setState({passwd})}
            value = {this.state.passwd}
            />
        <View style = {styles.action}>
            <TouchableOpacity><Text style={{paddingTop:5, fontSize:12}}>Forgot password?</Text></TouchableOpacity>
            <TouchableOpacity onPress = {this.handlePress} style = {styles.lg_btn_} ><Text style = {styles.lg_btn}>LOGIN</Text></TouchableOpacity>
        </View>
        
        
        
       </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
      height:120,
      width:DEVICE_WIDTH,
      alignItems:'center',
    
      paddingTop:10,
      
      paddingRight:22,
      paddingLeft:22,

    },
    input:{
        flex:1,
        marginTop:5,
        width:DEVICE_WIDTH-44,

        borderWidth:1,
        borderColor:"#ECECEC",
        paddingLeft:10,
        fontSize:10,
    },
    action:{
        flex:1,
        marginTop:5,
        width:DEVICE_WIDTH-44,
        flexDirection:'row',
        justifyContent:"space-between",

    },
    lg_btn:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:20,
        paddingRight:20,
        
        color:"white",
        fontSize:12,
    },
    lg_btn_:{
        borderRadius:20,
        backgroundColor:'#EC6E6F',
        justifyContent:'center',

    }

    

    
});

function mapStateToProps(state){
	return{
		state:state
	}
}
export default connect(mapStateToProps)(Form);