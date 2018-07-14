import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  status: false,
  proposals: null,
  request:false,
  error:null,
});




export function proposals(state = initialState, action = {}) {

    switch (action.type) {
      
      case types.PROPOSAL_REQUEST:
      
          return {
              ...state,
              status: false,
              request: true,
              proposals: null,
              error: null
          };
      case types.PROPOSAL_GET:
      
          return {
              ...state,
              status: true,
              request: false,
              proposals: action.proposal,
              error: null
          };
      case types.PROPOSAL_FAIL:
      
          return {
              ...state,
              status: false,
              request: false,
              proposals: null,
              error: action.error
          };
  
      default:
        return state;
    }
}