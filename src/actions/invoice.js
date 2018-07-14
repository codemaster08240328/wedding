import * as types from './actiontypes';
import { Alert,AsyncStorage } from 'react-native';

import { authService } from '../services/auth';

function handleResponse(type, invoice) {
    return { type, invoice };
}

function handleError(type, error) {
    return { type, error };
}


export function getInvoice(order_id){
    return dispatch => {
        dispatch(handleResponse(types.INVOICE_REQUEST, null));

        authService.getInvoice(order_id)
            .then(
                result => {
                    if(result.success=="true"){
                        
                        dispatch(handleResponse(types.INVOICE_GET, result.data));

                    }else{
                        dispatch(handleError(types.INVOICE_FAIL, result.message));
                    }
                }
                
            )
            .catch(error=>{
                dispatch(handleError(types.INVOICE_FAIL,"Network Failed"));
                alert('Network Failed');


            });
    };
}