import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';
import LoggedInUserContext from './contexts/LoggedInUserContext';
import { getUsersProfileData } from './services/userService';

import MainHeader from './components/Header/MainHeader';
import Router from './Router';

import './App.css';

function App() {
    const [jwtToken, setJwtToken] = useLocalStorage('jwt-token', null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken && !loggedInUser) {
            const userData = jwtDecode(jwtToken);

            getUsersProfileData({ userIds: [userData.userId], jwtToken })
                .then((result) => {
                    setLoggedInUser(result[0]);
                })
                .catch(() => {
                    console.log('something went wrong while trying to fetch user data');
                });
        } else if (!jwtToken) {
            setLoggedInUser(null);
        }
    }, [jwtToken, loggedInUser]);

    const updateLoggedInUser = (updatedUser) => {
        setLoggedInUser(updatedUser.user);
        setJwtToken(updatedUser.jwt);
    };

    const logoutHandler = (e) => {
        e.preventDefault();

        localStorage.removeItem('dcbyte-jwt');
        setJwtToken(null);
        navigate('/login');
    };

    const loggedInUserContextValues = {
        jwtToken,
        setJwtToken,
        loggedInUser,
        updateLoggedInUser,
        setLoggedInUser,
    };

    return (
        <LoggedInUserContext.Provider value={loggedInUserContextValues}>
            <MainHeader logoutHandler={logoutHandler} />

            <Router />
        </LoggedInUserContext.Provider>
    );
}

export default App;
