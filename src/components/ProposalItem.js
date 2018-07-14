import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
    
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import { getInvoice } from '../actions/invoice';
import { connect } from 'react-redux';


export default class ProposalItem extends React.Component{
   constructor(props){
       super(props);
       this.state = {
         showButton:true,
       }
       this.payBtnPress = this.payBtnPress.bind(this);
   }
   componentDidMount(){
     if(this.props.data.paysch_paid_status==1){
       this.setState({showButton:false});
     }else{
       this.setState({showButton:true});
     }
     this.compareDate();
   }

   convertTotal(total){
    var float = parseFloat(total);
    return float.toFixed(2);
   }
   convertDateFormat_(date){
    var res = date.split("-");
    return res[1] + '/' + res[2] + '/' + res[0];    
   }

   payBtnPress(){
    this.props.navigation.navigate("review",{prop_id:this.props.data.prop_id});
   }
  compareDate(){
    var startDate1 = new Date(this.convertDateFormat_(this.props.data.prop_end_date));
    var startDate2 = new Date(this.ShowCurrentDate()); 
    if(startDate1 < startDate2){
      this.props.expired();
    }
  }
  
   ShowCurrentDate=()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return month + "/" + date + "/" + year;
   }

   render(){
       return(
           <View style={styles.container}>
              <View style = {styles.desc}>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>Proposal ID: {this.props.data.prop_id}</Text>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>{this.props.data.prop_pkg_name.substr(0,30)}...</Text>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>Valid Date: {this.convertDateFormat_(this.props.data.prop_end_date)} </Text>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>Total: ${this.convertTotal(this.props.data.prop_total_value)}</Text>
              </View>
              <View style = {styles.pay_btn_sec}>
                <TouchableOpacity style = {styles.btn_pay} onPress = {this.payBtnPress}>
                    <Text style = {{color:'white', fontSize:10}}>REVIEW PROPOSAL</Text>
                </TouchableOpacity>
              </View>              
           </View>
       );
   }
}
const styles = StyleSheet.create({

    container:{
      flex:1,
      flexDirection:'row',
      borderColor:'#ECECEC',
      borderBottomWidth:1,
      width:DEVICE_WIDTH,
      paddingTop:5,
      paddingBottom:5,
    },
    desc:{
        flex:8,
        paddingLeft:10,

    },
    pay_btn_sec:{
        flex:6,
      alignItems:'center',
      justifyContent:'center',
    },
    btn_pay:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#EB6F6F',
        borderRadius:15,
        fontSize:10,

    }

    
  });

  
