import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

import './SignUpForm.css';

const SignUpForm = ({ signUpHandler }) => {
	const { values, changeHandler, onSubmit } = useForm({
        email: '',
		username: '',
        password: '',
        repeatPassword: ''
    }, signUpHandler);

    return (
		<section
			className='sign-up-section'
		>
			<Logo className='logo-color' />

			<form
				id='sign-up-form'
				onSubmit={onSubmit}
				className='sign-up-form'
			>
				<h1>Sign up</h1>

				<div className='input-wrapper'>
					<input
						type='email'
						id='email'
						name='email'
						placeholder='Email'
						value={values.email}
						onChange={changeHandler}
					/>
				</div>

				<div className='input-wrapper'>
					<input
						type='text'
						id='username'
						name='username'
						placeholder='Username'
						value={values.username}
						onChange={changeHandler}
					/>
				</div>

				<div className='input-wrapper'>
					<input
						type='password'
						id='password'
						name='password'
						placeholder='Password'
						value={values.password}
						onChange={changeHandler}
					/>
				</div>

				<div className='input-wrapper'>
					<input
						type='password'
						id='repeatPassword'
						name='repeatPassword'
						placeholder='Repeat password'
						value={values.repeatPassword}
						onChange={changeHandler}
					/>
				</div>

				<Button
					label='Submit'
				/>
			</form>

			<span className='login-link'>Already have an account? <Link to='/login'>Login</Link></span>
		</section>
	)
}

export default SignUpForm;
