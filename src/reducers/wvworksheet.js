import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  status: false,
  worksheet: null,
  request:false,
  error:null,
});




export function wvworksheet(state = initialState, action = {}) {

    switch (action.type) {
      
      case types.GET_WVWORK_REQUEST:
      
          return {
              ...state,
              status: false,
              request: true,
              worksheet: null,
              error: null
          };
      case types.GET_WVWORK_SUCCESS:
      
          return {
              ...state,
              status: true,
              request: false,
              worksheet: action.wvworksheet,
              error: null
          };
      case types.GET_WVWORK_FAIL:
      
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