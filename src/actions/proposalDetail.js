import * as types from './actiontypes';
import { Alert,AsyncStorage } from 'react-native';
import { authService } from '../services/auth';

function handleResponse(type, proposalDetail) {
    return { type, proposalDetail };
}

function handleError(type, error) {
    return { type, error };
}


export function getProposalOrderDetail(prop_id,odr_id=null,apply_coupon=null){
    // console.log('dispatch',cust_id);
    return dispatch => {
        dispatch(handleResponse(types.PROPOSAL_DETAIL_REQUEST, null));
        authService.getProposalOrderDetail(prop_id,odr_id=null,apply_coupon=null)
            .then(
                result => {
                    if(result.success=="true"){
                        dispatch(handleResponse(types.PROPOSAL_DETAIL_GET, result.data));
                    }else{
                        dispatch(handleError(types.PROPOSAL_DETAIL_FAIL, result.message));
                        Alert.alert(result.message);
                    }
                }
                
            ).catch(error=>{
                dispatch(handleError(types.PROPOSAL_DETAIL_FAIL, "Network Failed"));
                        Alert.alert("Network Failed");

            });
    };
}