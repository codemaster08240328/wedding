import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  AsyncStorage,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/SideMenu';


import Spinner from 'react-native-loading-spinner-overlay';
//action import;
import { getOrder } from '../actions/order';
import { init } from '../actions/order';


import LogoComponent from '../components/LogoComponent';
import NavBar from '../components/NavBar';
import OrderItem from '../components/OrderItem';
import { MenuProvider } from 'react-native-popup-menu';


class Orders extends Component {
    
    constructor(props){
      super(props);
      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state={
        isloading:true,
        list: this.ds.cloneWithRows([]),
        isOpen: false
      }  
      this.toggleSideMenu = this.toggleSideMenu.bind(this)
      this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    } 

    toggleSideMenu () {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

    onMenuItemSelected(item){
      this.setState({
        isOpen: false,
        selectedItem: item,
      });
        this.props.navigation.navigate(item);
    }

    updateMenuState(isOpen) {
      this.setState({ isOpen });
    }

    componentDidMount(){
      this.getOrderData();
    }
    getOrderData = async()=>{
      await AsyncStorage.getItem('cust_id',(error,result)=>{
        console.log('cust_id',result);
        this.props.getOrder(result);
      })
    }

    componentWillReceiveProps(nextProps) {
      console.log('next=====>', nextProps.state.order);
      if(nextProps.state.order.request==false && nextProps.state.order.status==true){ 
        this.setState({isloading:false,list: this.ds.cloneWithRows(nextProps.state.order.order)});
      }else if(nextProps.state.order.request == false && nextProps.state.order.status == false){
        this.setState({isloading:false});
      } 
      
    }
    render() {
      const menu = <Menu onItemSelected={this.onMenuItemSelected} props = {this.props} />;
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          menuPosition="right"
          onChange={isOpen => this.updateMenuState(isOpen)}
          
        >
        <MenuProvider>
          <View style = {styles.container}>
            <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            <LogoComponent ></LogoComponent>
            <NavBar  props = {this.props} title="ORDERS" back_have={false} handlePress={this.toggleSideMenu}></NavBar>
            <View style = {styles.body}>
              {!this.props.state.order.order&&<Text>No Record</Text>}
              <ListView
                dataSource={this.state.list}
                renderRow={(rowData) => <OrderItem {...this.props} data={rowData}/>}
              />
            </View>
          </View>
          </MenuProvider>
        </SideMenu>
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
function mapDispatchToProps(dispatch){
	return{
		getOrder : param=>{
			dispatch(getOrder(param));
    },
    initialize:()=>{
      dispatch(init());
    },
  }	
}
function mapStateToProps(state){
	return{
		state:state
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders);