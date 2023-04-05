import { Fragment } from "react"
import { Routes, Route } from 'react-router-dom';

import SignUpView from "./components/SignUpView/SignUpView";
import LoginView from "./components/LoginView/LoginView";
import FeedView from "./components/FeedView/FeedView";


const Router = () => {
	return (
		<Fragment>
			<Routes>
				<Route path="/sign-up" element={<SignUpView />} />
				<Route path="/login" element={<LoginView />} />
				<Route path="/main" element={<FeedView />} />
			</Routes>
		</Fragment>
	)
}

export default Router;
