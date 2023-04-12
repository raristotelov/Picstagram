
import { signUp } from "../../services/userService";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

import SignUpForm from "../SignUpForm/SignUpForm";

import "./SignUpView.css";

const SignUpView = () => {
	const signUpHandler = async (newUserData) => {
		console.log(newUserData);
		console.log(newUserData.img);
		
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
