import { useNavigate } from 'react-router-dom';

import { signUp } from '../../services/userService';

import SignUpForm from '../SignUpForm/SignUpForm';

import './SignUpView.css';

const SignUpView = () => {
	const navigate = useNavigate();

	const signUpHandler = async (newUserData) => {
		await signUp(newUserData);

		navigate('/log-in');
	};

	return (
		<section className='sign-up-wrapper'>
			<SignUpForm signUpHandler={signUpHandler} />
		</section>
	);
};

export default SignUpView;
