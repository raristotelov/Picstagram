

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LoggedInUserContext from "../../contexts/LoggedInUserContext";
import { login } from "../../services/userService";

import LoginForm from "../LoginForm/LoginForm";

import "./LoginView.css";

const LoginView = () => {
	const { updateLoggedInUser } = useContext(LoggedInUserContext);
	const navigate = useNavigate();

	const loginHandler = async (loginCredentials) => {
		const loggedUserData = await login(loginCredentials);
		updateLoggedInUser(loggedUserData);

		navigate("/feed");
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
