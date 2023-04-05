

import { useContext } from 'react';

import LoggedInUserContext from '../../contexts/loggedInUserContext';
import { login } from "../../services/userService";

import LoginForm from "../LoginForm/LoginForm";

import "./LoginView.css";

const LoginView = () => {
	const { setJwtToken, setLoggedInUser } = useContext(LoggedInUserContext);

	const loginHandler = async (loginCredentials) => {
		const loggedUserData = await login(loginCredentials);

		setJwtToken(loggedUserData.jwt);
		setLoggedInUser(loggedUserData.user)
	};

	return (
		<section className="login-wrapper">
			<LoginForm
				loginHandler={loginHandler}
			/>
		</section>
	);
};

export default LoginView;
