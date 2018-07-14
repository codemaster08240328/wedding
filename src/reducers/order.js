import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  status: false,
  order: null,
  request:false,
  error:null,
});




export function order(state = initialState, action = {}) {

    switch (action.type) {
      case types.ORDER_INITIALIZE:
            return initialState;
      case types.ORDER_REQUEST:
      
          return {
              ...state,
              status: false,
              request: true,
              order: null,
              error: null
          };
      case types.ORDER_GET:
      
          return {
              ...state,
              status: true,
              request: false,
              order: action.order,
              error: null
          };
      case types.ORDER_FAIL:
      
          return {
              ...state,
              status: false,
              request: false,
              order: null,
              error: action.error
          };
  
      default:
        return state;
    }
}