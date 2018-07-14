
import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  status: false,
  proposalDetails: null,
  request:false,
  error:null,
});




export function proposalDetails(state = initialState, action = {}) {

    switch (action.type) {
      
      case types.PROPOSAL_DETAIL_REQUEST:
      
          return {
              ...state,
              status: false,
              request: true,
              proposalDetails: null,
              error: null
          };
      case types.PROPOSAL_DETAIL_GET:
      
          return {
              ...state,
              status: true,
              request: false,
              proposalDetails: action.proposalDetail,
              error: null
          };
      case types.PROPOSAL_DETAIL_FAIL:
      
          return {
              ...state,
              status: false,
              request: false,
              proposalDetails: null,
              error: action
          };
  
      default:
        return state;
    }
}