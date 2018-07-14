import * as types from './actiontypes';
import { Alert } from 'react-native';

import { authService } from '../services/auth';

function handleResponse(type, invoicestatus) {
    return { type, invoicestatus };
}

function handleError(type, error) {
    return { type, error };
}


export function getInvoiceStatus(inv_id){
    return dispatch => {
        dispatch(handleResponse(types.INVOICE_STATUS_REQUEST, null));

        authService.getInvoiceStatus(inv_id)
            .then(
                result => {
                    if(result.success=="true"){
                        
                        dispatch(handleResponse(types.INVOICE_STATUS_GET, result.data));

                    }else{
                        Alert.alert(result.message);
                        dispatch(handleResponse(types.INVOICE_STATUS_FAIL, result.message));
                    }
                }
                
            ).catch(error=>{
                dispatch(handleError(types.INVOICE_STATUS_FAIL,"Network Failed"));
                        Alert.alert("Network Failed");
            });
    };
}