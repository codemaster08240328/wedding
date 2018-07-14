import axios from 'axios';
import * as API from './constant'; 
import {NetInfo, AsyncStorage} from 'react-native';
NetInfo.isConnected.addEventListener('connectionChange', (hasInternetConnection) =>{setNetWorkStatus()});


export const authService = {
    login,getOrder,getInvoice,getInvoiceStatus,getProposal,getProposalOrderDetail,getWeddingPhotography, getEngagementPhotography, getWeddingVideography
};

const getNetworkStatus=async()=>{
    networkconnection = await AsyncStorage.getItem('networkConnectionStatus')
    return networkconnection
}

setNetWorkStatus = async()=>{
    await AsyncStorage.setItem("networkConnectionStatus", hasInternetConnection);
}

function login(email, password) {
    const body = new FormData();
    body.append(API.KEY, API.API_KEY);
    body.append(API.ACTION, API.API_ACTION_LOGIN);
    body.append(API.JSON, true);
    body.append('cust_email', email);
    body.append('cust_pass', password);
    networkconnection = getNetworkStatus();
    console.log("networkconnection",networkconnection)
    const config = {
        url: '/',
        method: 'post',
        data: body
    };

    return axios.request(config)
        .then(res => res.data)
        .then(result => {        
            return result;
        });
}

function getOrder(id){
    const body = new FormData();
    body.append(API.KEY, API.API_KEY);
    body.append(API.ACTION, API.API_ACTION_ORDER);
    body.append(API.JSON, true);
    body.append('cust_id', id);

    const config = {
        url: '/',
        method: 'post',
        data: body
    };

    return axios.request(config)
        .then(res => res.data)
        .then(result => {
            return result;
        });
}

function getProposal(id){
    const body = new FormData();
    body.append(API.KEY, API.API_KEY);
    body.append(API.ACTION, API.API_ACTION_PROPOSAL);
    body.append(API.JSON, true);
    body.append('cust_id', id);
    const config = {
        url: '/',
        method: 'post',
        data: body
    };
    return axios.request(config)
        .then(res => res.data)
        .then(result => {
            return result;
        });
}
function getInvoice(order_id){
    const body = new FormData();
    body.append(API.KEY, API.API_KEY);
    body.append(API.ACTION, API.API_ACTION_INVOICE);
    body.append(API.JSON, true);
    body.append('odr_id', order_id);

    const config = {
        url: '/',
        method: 'post',
        data: body
    };

    return axios.request(config)
        .then(res => res.data)
        .then(result => {
           return result;
        });
}

function getInvoiceStatus(inv_id){
    const body = new FormData();
    body.append(API.KEY, API.API_KEY);
    body.append(API.ACTION, API.API_ACTION_STATUS);
    body.append(API.JSON, true);
    body.append('inv_id', inv_id);

    const config = {
        url: '/',
        method: 'post',
        data: body
    };

    return axios.request(config)
        .then(res => res.data)
        .then(result => { 
            return result;
        });
}

function getProposalOrderDetail(prop_id,odr_id,apply_coupon){
    const body = new FormData();
    body.append(API.KEY, API.API_KEY);
    body.append(API.ACTION, API.API_ACTION_REVIEW);
    body.append(API.JSON, true);
    body.append('prop_id', prop_id);
    body.append('odr_id', odr_id);
    body.append('apply_coupon',apply_coupon);
    const config = {
        url: '/',
        method: 'post',
        data: body
    }; 

    return axios.request(config)
        .then(res => res.data)
        .then(result => { 
            return result;

        });
}

function getWeddingPhotography(cust_id){

    const body = new FormData();
    body.append(API.KEY, API.API_KEY);
    body.append(API.ACTION, API.API_GETWEDDINGPHOTOGRPHY);
    body.append(API.JSON, true);
    body.append('cust_id', cust_id);
    networkconnection = getNetworkStatus();
    console.log("networkconnection",networkconnection)
    
    const config = {
        url: '/',
        method: 'post',
        data: body
    }; 
    if(!networkconnection)
        return axios.request(config)
            .then(res=>res.data)
            .then(result=>{
                return result
            });
    else{
        alert('network conection erro')
        return 'error, network'

    }
        
}

function getEngagementPhotography(cust_id){
    const body = new FormData();
    body.append(API.KEY, API.API_KEY);
    body.append(API.ACTION, API.API_GETENGAGEMENTPHOTOGRPHY);
    body.append(API.JSON, true);
    body.append('cust_id', cust_id);
    const config = {
        url: '/',
        method: 'post',
        data: body
    }; 
    return axios.request(config)
        .then(res=>res.data)
        .then(result=>{
            return result
        });
    
}

function getWeddingVideography(cust_id){
    const body = new FormData();
    body.append(API.KEY, API.API_KEY);
    body.append(API.ACTION, API.API_GETWEDDINGVIDEOGRAPHY);
    body.append(API.JSON, true);
    body.append('cust_id', cust_id);
    const config = {
        url: '/',
        method: 'post',
        data: body
    }; 
    return axios.request(config)
        .then(res=>res.data)
        .then(result=>{
            return result
        });
    
}
