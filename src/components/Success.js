import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
export default class Success extends Component {
    constructor(props){
        super(props);

    }
    render() {
      return (
       <View style = {styles.container}>
        
        <Text style = {styles.text}>
            Login Success. Welcome to our app.
        </Text>
       </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:DEVICE_WIDTH,
        alignItems:'center',
        paddingTop:20,
        paddingBottom:10,
        paddingRight:10,
        paddingLeft:10,
  
    },
    text:{
        flex:1,
        width:DEVICE_WIDTH-20,

        backgroundColor:'#F2FFF5',
        borderWidth:1,
        borderColor:"#4BD963",
        paddingLeft:15,
        paddingTop:6,
        color:"#4BD963"
    },

    

    
});