import * as types from './actiontypes';
import { authService } from '../services/auth';

function handleResponse(type, proposal) {
    return { type, proposal };
}

function handleError(type, error) {
    return { type, error };
}

export function init(){
    return dispatch => {
        dispatch(handleResponse(types.PROPOSAL_INITIALIZE,null));
    }
}

export function getProposal(cust_id){
    console.log('dispatch',cust_id);
    return dispatch => {
        dispatch(handleResponse(types.PROPOSAL_REQUEST, null));
        authService.getProposal(cust_id)
            .then(
                result => {
                    if(result.success=="true"){
                        dispatch(handleResponse(types.PROPOSAL_GET, result.data));
                    }else if(result.success=="false"){
                        dispatch(handleError(types.PROPOSAL_FAIL, 'Network Failed'))
                    }
                }
                
            ).catch(error=>{
                alert("Network Failed");
                dispatch(handleError(types.PROPOSAL_FAIL, "Network Failed"));

            });
    };
}