import { useState, Fragment } from 'react';

import useLocalStorage from './hooks/useLocalStorage'; 

import Header from './components/Header/Header';
import Router from './Router';

import './App.css';

function App() {
	const [jwtToken, setJwtToken] = useLocalStorage("jwt-token", null);
	const [loggedInUser, setLoggedInUser] = useState(null);
	
    return (
		<Fragment>
			<Header />

			<Router />
		</Fragment>
    );
}

export default App;
