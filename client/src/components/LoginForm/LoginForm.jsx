import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";

import Logo from "../Logo/Logo";

import './LoginForm.css';

const LoginForm = ({ onRegisterSubmit }) => {
	const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    return (
		<section
			className="login-section"
		>
			<Logo className="logo-color" />

			<form
				id="login-form"
				onSubmit={onSubmit}
				className="login-form"
			>
				<h1>Login</h1>

				<div className="input-wrapper">
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Email"
						value={values.email}
						onChange={changeHandler}
					/>
				</div>

				<div className="input-wrapper">
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Password"
						value={values.username}
						onChange={changeHandler}
					/>
				</div>
			</form>

			<span className="sign-up-link">Don't have an account? <Link to="/sign-up">Sign up</Link></span>
		</section>
	)
}

export default LoginForm;
