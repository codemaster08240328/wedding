import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  status: false,
  invoice:null,
  request:false,
  error:null,
});




export function invoice(state = initialState, action = {}) {

    switch (action.type) {

      case types.INVOICE_REQUEST:
      
          return {
              ...state,
              status: false,
              request: true,
              invoice: null,
              error: null
          };
      case types.INVOICE_GET:
      
          return {
              ...state,
              status: true,
              request: false,
              invoice: action.invoice,
              error: null
          };
      case types.INVOICE_FAIL:
      
          return {
              ...state,
              status: false,
              request: false,
              invoice: null,
              error: action.error
          };
  
      default:
        return state;
    }
}