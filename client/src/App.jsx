import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';
import LoggedInUserContext from './contexts/LoggedInUserContext';
import { getUsersProfileData } from './services/userService';

import MainHeader from './components/Header/MainHeader';
import TabBar from './components/TabBar/TabBar';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Router from './Router';

import './App.css';

// `jwtDecode` neither verifies the signature nor checks expiry, so a stale or
// malformed token has to be rejected here before it is used. Either case is
// treated the same: the token cannot restore a session.
const readUserIdFromToken = (token) => {
	try {
		const { userId, exp } = jwtDecode(token);

		if (typeof exp !== 'number' || exp * 1000 <= Date.now()) {
			return null;
		}

		return userId || null;
	} catch {
		return null;
	}
};

function App() {
	const [jwtToken, setJwtToken] = useLocalStorage('jwt-token', null);
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [isRestoringSession, setIsRestoringSession] = useState(Boolean(jwtToken));

	const navigate = useNavigate();

	useEffect(() => {
		if (!jwtToken) {
			setLoggedInUser(null);
			setIsRestoringSession(false);

			return;
		}

		if (loggedInUser) {
			return;
		}

		const userId = readUserIdFromToken(jwtToken);

		if (!userId) {
			setJwtToken(null);

			return;
		}

		setIsRestoringSession(true);

		getUsersProfileData({ userIds: [userId], jwtToken })
			.then((result) => {
				if (result[0]) {
					setLoggedInUser(result[0]);
				} else {
					// The token is valid but its user is gone; clearing it keeps the
					// header, the tab bar and the router from disagreeing about auth.
					setJwtToken(null);
				}
			})
			.catch(() => {
				setJwtToken(null);
			})
			.finally(() => {
				setIsRestoringSession(false);
			});
	}, [jwtToken, loggedInUser, setJwtToken]);

	const updateLoggedInUser = (updatedUser) => {
		setLoggedInUser(updatedUser.user);
		setJwtToken(updatedUser.jwt);
	};

	const logoutHandler = (e) => {
		e.preventDefault();

		setJwtToken(null);
		navigate('/log-in');
	};

	const loggedInUserContextValues = {
		jwtToken,
		setJwtToken,
		loggedInUser,
		updateLoggedInUser,
		setLoggedInUser,
		isRestoringSession,
	};

	// Rendering while the session is being restored would briefly show the guest
	// header and guest tab bar to someone who is in fact logged in.
	if (isRestoringSession) {
		return <LoadingSpinner />;
	}

	return (
		<LoggedInUserContext.Provider value={loggedInUserContextValues}>
			<MainHeader logoutHandler={logoutHandler} />

			<Router />

			<TabBar />
		</LoggedInUserContext.Provider>
	);
}

export default App;
