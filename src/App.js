import React, { Component } from 'react';

import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import store from "./store";

import './App.css';
import Main from "./pages/Main";

class App extends Component {
	render() {
		return (
			<CookiesProvider>
				<Provider store={store}>
					<Main />
				</Provider>
			</CookiesProvider>
			
			
		);
	}
}

export default App;
