import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoggedInUserContext from './contexts/LoggedInUserContext';

import SignUpView from './components/SignUpView/SignUpView';
import LoginView from './components/LoginView/LoginView';
import ProfileView from './components/ProfileView/ProfileView';
import FeedView from './components/FeedView/FeedView';
import PopularPostsView from './components/PopularPostsView/PopularPostsView';


import './index.css';

const Router = () => {
	const { jwtToken } = useContext(LoggedInUserContext);

	return (
		<div className='routes-wrapper'>
			<Routes>
				<Route path='/' element={jwtToken ? <Navigate to='/feed' /> : <Navigate to='/login' />} />

				<Route path='/sign-up' element={<SignUpView />} />

				<Route path='/login' element={<LoginView />} />

				<Route path='/my-profile' element={<ProfileView />} />

				<Route path='/feed' element={<FeedView />} />

				<Route path='/popular-posts' element={<PopularPostsView />} />

				<Route path='/user/:userId' element={<ProfileView />} />
			</Routes>
		</div>
	)
}

export default Router;
