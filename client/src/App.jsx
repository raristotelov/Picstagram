import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';
import LoggedInUserContext from './contexts/LoggedInUserContext';
import { getUsersProfileData } from './services/userService';

import MainHeader from './components/Header/MainHeader';
import MobileTopBar from './components/Header/MobileTopBar';
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
	// The user record is the source of truth, mirrored here so the choice survives
	// logging out — there is no user to read it from on the auth pages.
	const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'light');

	const navigate = useNavigate();

	useEffect(() => {
		const theme = loggedInUser?.theme || storedTheme;

		document.documentElement.setAttribute('data-theme', theme);

		if (loggedInUser?.theme && loggedInUser.theme !== storedTheme) {
			setStoredTheme(loggedInUser.theme);
		}
	}, [loggedInUser, storedTheme, setStoredTheme]);

	useEffect(() => {
		if (!jwtToken) {
			setLoggedInUser(null);
			setIsRestoringSession(false);

			return;
		}

		if (loggedInUser) {
			return;
		}

		// A token that cannot be turned back into a session is treated as a broken
		// session rather than a guest visit: drop it and send the user to log in,
		// so the app never renders a half-authenticated state.
		const abandonSession = () => {
			setJwtToken(null);
			navigate('/log-in');
		};

		const userId = readUserIdFromToken(jwtToken);

		if (!userId) {
			abandonSession();

			return;
		}

		setIsRestoringSession(true);

		getUsersProfileData({ userIds: [userId], jwtToken })
			.then((result) => {
				if (result[0]) {
					setLoggedInUser(result[0]);
				} else {
					abandonSession();
				}
			})
			.catch((error) => {
				// Only a rejected token ends the session. A network failure — including
				// this request being aborted because the page is reloading — must leave
				// the token alone, or a fast refresh logs the user out.
				if (error?.status === 401 || error?.status === 403) {
					abandonSession();
				}
			})
			.finally(() => {
				setIsRestoringSession(false);
			});
	}, [jwtToken, loggedInUser, setJwtToken, navigate]);

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
		return <LoadingSpinner isFullPage />;
	}

	return (
		<LoggedInUserContext.Provider value={loggedInUserContextValues}>
			<MainHeader logoutHandler={logoutHandler} />

			<MobileTopBar logoutHandler={logoutHandler} />

			<Router />

			<TabBar />
		</LoggedInUserContext.Provider>
	);
}

export default App;
