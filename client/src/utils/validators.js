export const MIN_PASSWORD_LENGTH = 8;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getEmailErrors = (email) => {
	if (!email?.trim()) {
		return ['Email is required'];
	}

	if (!emailPattern.test(email)) {
		return ['Please provide a valid email address'];
	}

	return [];
};

const getPasswordErrors = (password) => {
	if (!password) {
		return ['Password is required'];
	}

	const messages = [];

	if (password.length < MIN_PASSWORD_LENGTH) {
		messages.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
	}

	return messages;
};

export const validateLogin = ({ email, password }) => {
	const fields = {};

	const emailErrors = getEmailErrors(email);

	if (emailErrors.length) {
		fields.email = emailErrors;
	}

	if (!password) {
		fields.password = ['Password is required'];
	}

	return { fields };
};

export const validateSignUp = ({ email, username, password, repeatPassword }) => {
	const fields = {};
	let formError = '';

	const emailErrors = getEmailErrors(email);

	if (emailErrors.length) {
		fields.email = emailErrors;
	}

	if (!username?.trim()) {
		fields.username = ['Username is required'];
	}

	const passwordErrors = getPasswordErrors(password);

	if (passwordErrors.length) {
		fields.password = passwordErrors;
	}

	if (!repeatPassword) {
		fields.repeatPassword = ['Please repeat your password'];
	} else if (password && password !== repeatPassword) {
		formError = 'Passwords do not match';
	}

	return { fields, formError };
};
