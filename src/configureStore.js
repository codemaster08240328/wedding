import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from "redux";
import * as reducers from "./reducers/index";
import logger from 'redux-logger';
import thunk from "redux-thunk";
const createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);
const reducer = combineReducers(reducers);
const configureStore = createStoreWithMiddleware(reducer);



export default configureStore;