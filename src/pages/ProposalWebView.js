import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  WebView,
  Image,
  TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import LogoComponent from '../components/LogoComponent';
import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import { getInvoiceStatus } from '../actions/invoice_status';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/SideMenu';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class ProposalWebView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.navigation.getParam("id"),
      user_name:this.props.state.auth.loggedInUser.cust_fname,
      amt:this.props.navigation.getParam('amount'),
      status:false,
      isOpen: false
    };

    this.onWebViewMessage = this.onWebViewMessage.bind(this);
    this.doneBtnHandle = this.doneBtnHandle.bind(this)
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

  doneBtnHandle(){
    this.props.navigation.navigate("OrderList");
  }

  componentDidMount(){
    this.getInvoiceStatus(this.state.id)
  }

  getInvoiceStatus(){
    console.log('prop_id',this.state.id);
    const t = setTimeout(()=>{
      this.props.dispatch(getInvoiceStatus(this.state.id));
      this.getInvoiceStatus(this.state.id);
    },10000);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.state.invoicestatus.invoicestatus==null)
      return;
    if (nextProps.state.invoicestatus.invoicestatus.paysch_paid_status=='1')
    {
      console.log("Success");
      this.setState({status:true});
      
      return;
    }else{
      this.getInvoiceStatus();
    }
    
  }

  handleDataReceived(msgData) {
    this.setState({
      text2: `Data Descriptor : ${msgData.data.desc}`,
      text1: `Data Value : ${msgData.data.value}`
    });
    
    msgData.isSuccessfull = true;
    msgData.args = [msgData.data % 2 ? "green" : "red"];
    this.myWebView.postMessage(JSON.stringify(msgData));
  }

  onWebViewMessage(event) {
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.warn(err);
      return;
    }

    switch (msgData.targetFunc) {
      case "handleDataReceived":
        this[msgData.targetFunc].apply(this, [msgData]);
        break;
    }
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
        <View style={styles.container}>
          <LogoComponent  ></LogoComponent>
          <NavBar  props = {this.props} title="REVIEW PROPOSAL & PAY" back_have={!this.state.status?true:false} handleBactPress = {() => goBack()} handlePress={this.toggleSideMenu}></NavBar>
          <View style={styles.webViewContainer}>
          {!this.state.status&&
            <WebView
              ref={webview => {
                this.myWebView = webview;
              }}
              scrollEnabled={false}
              style = {{height:DEVICE_HEIGHT,width:DEVICE_WIDTH}}
              source={!this.state.status?{uri: 'https://payments.weddingphotomenu.com?inv_id=' + this.state.id + '&amount='+this.state.amt+'&return_url=proposalPaidInMobile&description=Payment_For_Invoice_' + this.state.id + '&customer_name=' + this.state.user_name}:require("../assets/heart-0.5s-298px.html")}
              onMessage={this.onWebViewMessage}
            />
            }
            {this.state.status&&
            <View style = {styles.webViewContainer} >
              <Image
                style = {{height:200,width:200}}
                source = {okIcon}
              />

              <Text style = {{fontSize:20}}>Confirm Successful!</Text>
              <TouchableOpacity 
                  onPress={this.doneBtnHandle} 
                  style = {{marginTop:30, backgroundColor:"#EC6C6B",paddingBottom:5,borderRadius:15,paddingLeft:10,paddingRight:10,paddingTop:5}}>
                  <Text style = {{fontSize:10, color:'white'}}>
                      DONE
                  </Text>
              </TouchableOpacity>
              
            </View>
          }
          </View>
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'white',


  },
  welcome: {
    flex: 1,
    paddingTop: 20,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "skyblue"

  },
  webViewContainer: {
    justifyContent:'center',
    alignItems:'center',
    flex: 15
  }
});

function mapStateToProps(state){
	return{
		state:state
	}
}
export default connect(mapStateToProps)(ProposalWebView);
