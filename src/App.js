import React, { Component } from 'react';

import DiscussionThumbnail from "./components/DiscussionThumbnail";

import logo from './logo.svg';
import carre from "./entete-carre-magenta.png"
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
				    <DiscussionThumbnail
                        friendsProfilepic={carre}
                        friendsName="Liam Neeson"
                        lastMessage="Long time no see pal! But i need to had some text to really see how it fits, eventhough its getting quite, i think we haven't met the limit. Now it should be good"
                    />
    
				</p>
			</div>
		);
	}
}

export default App;
