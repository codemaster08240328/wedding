import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  Image,
  Text,
  AsyncStorage

  
} from 'react-native';
import { connect } from 'react-redux';

import logoImg from '../assets/logo.png';
const DEVICE_WIDTH = Dimensions.get('window').width;
class LogoComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            logIn : false,
            name : '',
            address:'',
            zip:'',
            date:'',
        }
    }
    componentDidMount(){
        this.getUserData();
        
    }
    getUserData = async() => {
        
        await AsyncStorage.getItem('cust_fname',(error,result)=>{
            if(result){
                console.log('result_logo',result);
                this.setState({logIn:true,name:result})
            }
                
        });
        await AsyncStorage.getItem('address',(error, result)=>{
            console.log('result_logo',result);
            this.setState({address:result})
        })
        await AsyncStorage.getItem('cust_zip',(error, result)=>{
            console.log('result_logo',result);

            this.setState({zip:result})
        })
        await AsyncStorage.getItem('cust_wed_date',(error, result)=>{
            if(result!=null)
                this.setState({date:this.convertDateFormat(result)})
        })

    }
    convertDateFormat(date){
        var res = date.split("-");
        return res[1] + '/' + res[2] + '/' + res[0];
    }
    render() {
      console.log('fname',this.props);
      return (
       <View style = {styles.container}>
        
            <Image
                source={logoImg}
            />        
        
        { this.props.auth.loggedIn && <View style = {styles.LogoDAc}>
            <Text style = {styles.LogoDesc}>{this.state.name}</Text>
            <Text style = {styles.LogoDescCon}>Hi! {this.props.auth.loggedInUser.cust_fname}, Your wedding at {this.props.auth.loggedInUser.cust_addr1}, {this.props.auth.loggedInUser.cust_zip} on {this.convertDateFormat(this.props.auth.loggedInUser.cust_wed_date)}</Text>
        </View> }
        
       </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
        height:130,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop:15
    },
    LogoImage:{
        justifyContent:'center',
        alignItems:'center',
    },
    LogoDesc:{
        
        fontWeight:'bold',
        fontSize:13,
        textAlign:'center',
        width:100,


    },
    LogoDAc:{
        marginTop:3,
        alignItems:'center',
    },
    LogoDescCon:{
        fontSize:10,
        textAlign:'center',
        width:DEVICE_WIDTH-120,
        color:"#6C6C6C",
    }

   
});

function mapStateToProps(state){
	return{
		auth:state.auth
	}
}

export default connect(mapStateToProps)(LogoComponent);