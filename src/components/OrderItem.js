import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    
} from 'react-native';
import Dimensions from 'Dimensions';
import { Icon } from 'react-native-elements'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const DEVICE_WIDTH = Dimensions.get('window').width;



export default class OrderItem extends React.Component{
   constructor(props){
       super(props);
       this.state = {
         showButton:true,
       }
       this.payBtnPress = this.payBtnPress.bind(this);
       this.dotBtnPress = this.dotBtnPress.bind(this);
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

   dotBtnPress=(value)=>{
     const odr_id = this.props.data.odr_id
     const photog_id = this.props.data.photog_id
     const videog_id = this.props.data.videog_id
     console.log(value);
     this.props.navigation.navigate(value,{odr_id, photog_id, videog_id});
   }

   payBtnPress(){
     var data_obj = {
        order_id:this.props.data.odr_id,
        package:this.props.data.odr_pkg_name
    }
    this.props.navigation.navigate("invoice",data_obj);

   }

   render(){
       return(
         
           <View style={styles.container}>
              <View style = {styles.desc}>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>Order ID: {this.props.data.odr_id}</Text>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>{this.props.data.odr_pkg_name.substr(0,25)}...</Text>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>Photographer: {this.props.data.photog_full_name}</Text>
                <Text style = {{fontSize:10,color:'#6C6C6C'}}>Total Outstanding: ${this.convertTotal(this.props.data.payment_info.odr_total_outstanding)}</Text>
              </View>
              <View style = {styles.pay_btn_sec}>
                <TouchableOpacity style = {styles.btn_pay} onPress = {this.payBtnPress}>
                    <Text style = {{color:'white', fontSize:10}}>MAKE PAYMENTS</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>

                <Menu onSelect={(value) => this.dotBtnPress(value)} >
                  <MenuTrigger>
                    <Icon 
                      name="dots-three-vertical"
                      type='entypo'
                      style = {{
                        fontSize:20,

                      }}
                      color="#727272"
                    />
                  </MenuTrigger>
                  <MenuOptions customStyles={{ optionText: styles.text,optionsContainer:styles.menuOption,optionsWrapper:styles.menuOptionsWrapper }}>
                    <MenuOption value="WPWorkSheet" style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:'#727272',padding:10,borderTopWidth:1, borderRightWidth:1, borderLeftWidth:1}}>
                      <Icon type="font-awesome" name="diamond" color="#EB6F6F" size={15}/>
                      <Text style={{color: '#EB6F6F', marginLeft:10}}>WEDDING PHOTOGRAPHY WORKSHEET</Text>
                    </MenuOption>
                    <MenuOption value="EPWorkSheet" style={{flex:1,flexDirection:'row', borderBottomWidth:1,borderColor:'#727272',padding:10, borderRightWidth:1, borderLeftWidth:1}}>
                      <Icon type="font-awesome" name="diamond" color="#EB6F6F" size={15}/>
                      <Text style={{color: '#EB6F6F', marginLeft:10}}>ENGAGEMENT PHOTOGRAPHY WORKSHEET</Text>
                    </MenuOption>
                    <MenuOption value="WVWorkSheet" style={{flex:1,flexDirection:'row', borderBottomWidth:1,borderColor:'#727272',padding:10, borderRightWidth:1, borderLeftWidth:1}}>
                      <Icon type="font-awesome" name="diamond" color="#EB6F6F" size={15}/>  
                      <Text style={{color: '#EB6F6F', marginLeft:10}}>WEDDING VIDEOGRAPHY WORKSHEET</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
                
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
      // height:65,
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
      alignItems:'flex-end',
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

    },
    text: {
      fontSize: 18,
    },
    menuOption:{
      width:340,
      position:'absolute',
      zIndex:100,
    }

    
  });

  
