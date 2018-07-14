import * as types from './actiontypes';
import { authService } from '../services/auth';

function handleResponse(type, wpworksheet) {
    return { type, wpworksheet };
}

function handleError(type, error) {
    return { type, error };
}

function handleEPResponse(type, epworksheet) {
    return { type, epworksheet };
}


function handleWVResponse(type, wvworksheet) {
    return { type, wvworksheet };
}

export function getWPWorkSheetData(cust_id){
    return dispatch => {
        dispatch(handleResponse(types.GET_WPWORK_REQUEST, null));
        authService.getWeddingPhotography(cust_id)
            .then(
                result => {
                    console.log(result);

                    if(result.success=="true"){
                        dispatch(handleResponse(types.GET_WPWORK_SUCCESS, result.data));
                    }
                }
            ).catch(error=>{
                alert("Network Failed");
                dispatch(handleError(types.GET_WPWORK_FAIL, "Network Failed"));
            });
    };
}

export function getEPWorkSheetData(cust_id){
    return dispatch => {
        dispatch(handleEPResponse(types.GET_EPWORK_REQUEST, null));
        authService.getEngagementPhotography(cust_id)
            .then(
                result => {
                    if(result.success=="true"){
                        dispatch(handleEPResponse(types.GET_EPWORK_SUCCESS, result.data));
                    }
                }
            ).catch(error=>{
                alert('NetWork Failed');
                dispatch(handleError(types.GET_EPWORK_FAIL, 'Network Failed'))
            });
    }
}

export function getWVWorkSheetData(cust_id){
    return dispatch => {
        dispatch(handleWVResponse(types.GET_WVWORK_REQUEST, null));
        authService.getWeddingVideography(cust_id)
            .then(
                result => {
                    if(result.success=="true"){
                        dispatch(handleWVResponse(types.GET_WVWORK_SUCCESS, result.data));
                    }
                }
            ).catch(error=>{
                alert('NetWork Failed');
                dispatch(handleError(types.GET_WVWORK_FAIL, 'Network Failed'))
            });
    }
}
