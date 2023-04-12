import { Routes, Route } from 'react-router-dom';

import SignUpView from "./components/SignUpView/SignUpView";
import LoginView from "./components/LoginView/LoginView";
import ProfileView from "./components/ProfileView/ProfileView";
import FeedView from "./components/FeedView/FeedView";

import "./index.css";

const Router = () => {
	return (
		<div className="routes-wrapper">
			<Routes>
				<Route path="/sign-up" element={<SignUpView />} />
				<Route path="/login" element={<LoginView />} />
				<Route path="/my-profile" element={<ProfileView />} />

				<Route path="/main" element={<FeedView />} />
			</Routes>
		</div>
	)
}

export default Router;
