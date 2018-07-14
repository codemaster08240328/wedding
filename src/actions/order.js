import * as types from './actiontypes';
import { Alert,AsyncStorage } from 'react-native';

/*
Action Creators
*/

import { authService } from '../services/auth';

function handleResponse(type, order) {
    return { type, order };
}

function handleError(type, error) {
    return { type, error };
}

export function init(){
    return dispatch => {
        dispatch(handleResponse(types.ORDER_INITIALIZE,null));
    }
}

export function getOrder(cust_id){
    return dispatch => {
        dispatch(handleResponse(types.ORDER_REQUEST, null));

        authService.getOrder(cust_id)
            .then(
                result => {
                    if(result.success=="true"){
                        
                        dispatch(handleResponse(types.ORDER_GET, result.data));

                    }else{
                        // alert(result.message)
                        dispatch(handleError(types.ORDER_FAIL, result.message));
                        // alert(result.message);
                    }
                }
                
            )
            .catch(error=>{
                dispatch(handleError(types.ORDER_FAIL, "Network Failed"));
                Alert.alert("Network Failed");



            });
    };
}