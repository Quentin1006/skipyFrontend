import React, { Component } from 'react';

import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from "react-router-dom";

import store from "./store";

import PrimaryLayout from "./layouts/PrimaryLayout";
import { SocketSearchProvider } from "./components/SocketContext/SocketContext";

import './App.css';

class App extends Component {
	
	render() {
		return (
			<CookiesProvider>
				<Provider store={store}>
					<SocketSearchProvider>
						<BrowserRouter >
							<PrimaryLayout/>
						</BrowserRouter>
					</SocketSearchProvider>
				</Provider>
			</CookiesProvider>
		);
	}
}

export default App;