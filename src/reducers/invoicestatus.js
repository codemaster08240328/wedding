import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  status: false,
  invoicestatus:null,
  request:false,
  error:null,
});




export function invoicestatus(state = initialState, action = {}) {

    switch (action.type) {
      case types.INVOICE_STATUS_REQUEST:
          return {
              ...state,
              status: false,
              request: true,
              invoicestatus: null,
              error: null
          };

      case types.INVOICE_STATUS_GET:
          return {
              ...state,
              status: true,
              request: false,
              invoicestatus: action.invoicestatus,
              error: null
          };

      case types.INVOICE_STATUS_FAIL:
          return {
              ...state,
              status: false,
              request: false,
              invoicestatus: null,
              error: action.error
          };
  
      default:
        return state;
    }
}