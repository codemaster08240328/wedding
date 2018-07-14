import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  status: false,
  worksheet: null,
  request:false,
  error:null,
});




export function epworksheet(state = initialState, action = {}) {

    switch (action.type) {
      
      case types.GET_EPWORK_REQUEST:
      
          return {
              ...state,
              status: false,
              request: true,
              worksheet: null,
              error: null
          };
      case types.GET_EPWORK_SUCCESS:
      
          return {
              ...state,
              status: true,
              request: false,
              worksheet: action.epworksheet,
              error: null
          };
      case types.GET_EPWORK_FAIL:
      
          return {
              ...state,
              status: false,
              request: false,
              worksheet: null,
              error: action.error
          };
  
      default:
        return state;
    }
}