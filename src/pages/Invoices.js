'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';
import InvoiceItem from '../components/InvoiceItem';
import { connect } from 'react-redux';
import { getInvoice } from '../actions/invoice';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/SideMenu';
import LogoComponent from '../components/LogoComponent';
import NavBar from '../components/NavBar';
import Spinner from 'react-native-loading-spinner-overlay';

class Invoices extends Component {
  constructor(props) {
      super(props);
      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        isloading:false,
        ord_id:this.props.navigation.getParam("order_id"),
        user_name:this.props.navigation.getParam("package"),
        dataSource: this.ds.cloneWithRows([]),
        isOpen: false     
      };
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

  componentWillReceiveProps(nextProps){
      if(nextProps.state.invoice.invoice!=null)
        this.setState({isloading:false, dataSource:this.ds.cloneWithRows(nextProps.state.invoice.invoice)});
      else if(nextProps.state.invoice.error!=null)
        this.setState({isloading:false});
  }

  componentDidMount() {
      this.setState({isloading:true});
      this.props.dispatch(getInvoice(this.state.ord_id));
  }

  render() {
    const {goBack} = this.props.navigation;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          menuPosition="right"
          onChange={isOpen => this.updateMenuState(isOpen)}
          props = {this.props}
        >
        <View style = {styles.container}>
          <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
          <LogoComponent ></LogoComponent>
          <NavBar  props = {this.props} title="PAYMENT HISTORY" back_have={true} handleBactPress = {() => goBack()} handlePress={this.toggleSideMenu}></NavBar>
          <View style = {styles.body}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <InvoiceItem {...this.props} data = {rowData}/>}
              />
          </View>
        </View>
      </SideMenu>
    );
  }
}
const styles = StyleSheet.create({
  body:{
    flex:9,
    paddingLeft:10,
    paddingRight:10,
  },
  container:{
    flex: 3,
    alignItems: 'center',
    backgroundColor:'white',
  },
});
function mapStateToProps(state){
	return{
		state:state
	}
}
export default connect(mapStateToProps)(Invoices);