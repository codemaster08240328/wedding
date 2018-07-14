import React from 'react';

import { Provider } from 'react-redux';

import axios from 'axios';

import configureStore from './src/configureStore';


import RootNavigator from './src/Navigator';

axios.defaults.baseURL = 'https://www.weddingphotomenu.com/api/customer';


export default class App extends React.Component {

	render() {
		return (
			<Provider store={configureStore}>
       
				<RootNavigator/>
			</Provider>
		);
	}
}
