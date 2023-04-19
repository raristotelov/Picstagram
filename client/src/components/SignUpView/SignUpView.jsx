
import { signUp } from "../../services/userService";

import SignUpForm from "../SignUpForm/SignUpForm";

import "./SignUpView.css";

const SignUpView = () => {
	const signUpHandler = async (newUserData) => {
		const registeredUser = await signUp(newUserData);
	};

	return (
		<section className="sign-up-wrapper">
			<SignUpForm 
				signUpHandler={signUpHandler}
			/>
		</section>
	);
};

export default SignUpView;
