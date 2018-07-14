import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
import { Icon } from 'react-native-elements'
export default class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            logIn : false
        }
    }

    render() {
      return (
       <View style = {styles.container}>
        {this.props.back_have && <TouchableOpacity  style = {styles.back} onPress={this.props.handleBactPress}>
                <Icon name="ios-arrow-back" type="ionicon" color="#EB6F6F" /><Text style={{color:'#EB6F6F',fontSize:16, paddingLeft:3}}>Back</Text>  
            </TouchableOpacity>}
        <Text style = {styles.headerTitle}>
            {this.props.title}
        </Text>
        {!this.props.menu&&<TouchableOpacity  style = {styles.menu} onPress = {this.props.handlePress}>
            <Icon name="menu" type="feather" color="#b4b4b4" size={25} />
        </TouchableOpacity>}
        
        
        
       </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
      justifyContent:'center',
      flexDirection:"row",
      backgroundColor:"#F4F4F4",
      height:40,
      width:DEVICE_WIDTH,
      alignItems:'center',
      borderWidth:1,
      borderColor:"#EDEDED"
    },
    header:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#3a4a51',
        alignItems: 'flex-end',
        paddingBottom:12,
        paddingLeft:52,
    },
    headerTitle:{
        fontSize:15,  
    },
    back:{
        position:'absolute',
        left:15,
        flex:1,
        flexDirection:'row',
        alignItems:'center'

    },
    menu:{
        position:'absolute',
        right:15,
    },
    

    
});