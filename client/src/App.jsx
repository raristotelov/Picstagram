import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken'

import useLocalStorage from './hooks/useLocalStorage'; 
import LoggedInUserContext from './contexts/loggedInUserContext';

import Header from './components/Header/Header';
import Router from './Router';

import './App.css';

function App() {
	const [jwtToken, setJwtToken] = useLocalStorage("jwt-token", null);
	const [loggedInUser, setLoggedInUser] = useState(null);
	
	useEffect(() => {
		if (jwtToken && !loggedInUser) {
			const userData = jwt.decode(jwtToken);

			setLoggedInUser(userData);
		} else if (!jwtToken) {
			setLoggedInUser(null);
		}
	}, [jwtToken, loggedInUser]);

	const logoutHandler = (e) => {
		e.preventDefault();

		localStorage.removeItem("dcbyte-jwt");
		setJwtToken(null);
	};
	
	const loggedInUserContextValues = {
        jwtToken,
        setJwtToken,
        loggedInUser,
        setLoggedInUser
    };

    return (
		<LoggedInUserContext.Provider value={loggedInUserContextValues}>
			<Header
				logoutHandler={logoutHandler}
				loggedInUser={loggedInUser}
			/>

			<Router />
		</LoggedInUserContext.Provider>
    );
}

export default App;
