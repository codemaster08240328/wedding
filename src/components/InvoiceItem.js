import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class InvoiceItem extends React.Component{
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
    }

   convertTotal(total){
    var float = parseFloat(total);
    return float.toFixed(2);
   }

   payBtnPress(){

       var data_value = {
           id:this.props.data.id,
           amt:this.props.data.paysch_amount,
       }
       
        this.props.navigation.navigate("pay",data_value);
   }
    convertDateFormat(date){
        var res = date.split("-");
        return res[1] + '/' + res[2] + '/' + res[0].substr(2);
    }
    convertDateFormat_(date){
        var res = date.split("-");
        return res[1] + '/' + res[2] + '/' + res[0];
    }

    sumNum(str1, str2){
        return (parseFloat(str1)+parseFloat(str2)).toFixed(2);
    }
    


   render(){
       return(
           <View style={styles.container}>
              <View style = {styles.desc}>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>Invoice ID: {this.props.data.id}</Text>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>{this.props.data.paysch_desc.substr(0,45)}...</Text>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>Total: ${this.sumNum(this.props.data.paysch_amount,this.props.data.paysch_tax)}</Text>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>Due Date: {this.convertDateFormat_(this.props.data.paysch_duedate)}</Text>
              </View>
              <View style = {styles.pay_btn_sec}>
                { !this.state.showButton && <Text style = {{color:'#27B745',fontSize:10}}>PAID</Text>}
                { !this.state.showButton && <Text style = {{fontSize:10,color:'#6C6C6C',paddingRight:5}}>on {this.convertDateFormat(this.props.data.paysch_paid_date)}</Text>}
                
                { this.state.showButton && 
                    <TouchableOpacity style = {styles.btn_pay} onPress = {this.payBtnPress} >
                        <Text style = {{color:'white', fontSize:10}}>PAY</Text>
                    </TouchableOpacity>
                }
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
    //   height:,
      width:DEVICE_WIDTH,
      paddingTop:5,
      paddingBottom:5
    },
    desc:{
        flex:8,
        paddingLeft:10,

    },
    pay_btn_sec:{
        flex:4,
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
        fontSize:15,

    }

    
  });

  
  
