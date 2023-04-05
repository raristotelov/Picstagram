
import signUp from "../../services/userService";

import SignUpForm from "../SignUpForm/SignUpForm";

import "./SignUpView.css";

const SignUpView = () => {
	return (
		<section className="sign-up-wrapper">
			<SignUpForm />
		</section>
	);
};

export default SignUpView;
