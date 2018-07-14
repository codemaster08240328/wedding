import * as types from './actiontypes';
import { Alert,AsyncStorage } from 'react-native';

/*
Action Creators
*/

import { authService } from '../services/auth';


function handleResponse(type, user) {
    return { type, user };
}

function handleError(type, error) {
    return { type, error };
}

function initialize(type, user){
  return { type, user };
}

const setStorage=async(result)=>{
    await AsyncStorage.setItem('cust_id', result.data.cust_id)
    await AsyncStorage.setItem('cust_fname',result.data.cust_fname)
    await AsyncStorage.setItem('address',result.data.cust_addr1)
    await AsyncStorage.setItem('cust_zip',result.data.cust_zip)
    await AsyncStorage.setItem('cust_wed_date',result.data.cust_wed_date)
}



/*
dispatch the actionCreators 
*/

export function appInitialized() {
  return async function(dispatch) {
      dispatch(initialize(types.INITIALIZED));
  };
}

export function login(email, password) {
    return dispatch => {
        dispatch(handleResponse(types.LOGIN_REQUEST, {email, password}));

        authService.login(email, password)
            .then(
                result => {
                    if(result.success=="true"){
                        setStorage(result);
                        dispatch(handleResponse(types.LOGIN_SUCCESS, result.data));

                    }else{
                        dispatch(handleError(types.LOGIN_FAILURE,result.message));
                    }
                }     
            ).catch(error=>{
                dispatch(handleError(types.LOGIN_FAILURE,"Network Failed"));
                        Alert.alert("Network Failed");
            });
    };
};
export function setAuth(data){
    return dispatch => {
        dispatch(handleResponse(types.SET_AUTH, data));
    }

}



