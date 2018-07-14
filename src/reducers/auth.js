import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  loggedIn: null,
  loggingIn:null,
  loggedInUser:null,
  error:null,
});

//root reducer
export function auth(state = initialState, action = {}) {

  switch (action.type) {
    case types.INITIALIZED:
        return initialState;
    case types.LOGIN_REQUEST:
    
        return {
            ...state,
            loggedIn: null,
            loggingIn: true,
            loggedInUser: null,
            error: null
        };
    case types.LOGIN_SUCCESS:
    
        return {
            ...state,
            loggedIn: true,
            loggingIn: false,
            loggedInUser: action.user,
            error: null
        };
    case types.LOGIN_FAILURE:
    
        return {
            ...state,
            loggedIn: false,
            loggingIn: false,
            loggedInUser: null,
            error: action.error
        };
    case types.SET_AUTH:
        return {
            ...state,
            loggedIn:true,
            logginIn:false,
            loggedInUser:action.user,
            error:null
        }
    default:
      return state;
  }
}
