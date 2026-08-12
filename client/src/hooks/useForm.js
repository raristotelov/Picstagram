import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler, { submitAllValues = false, validate } = {}) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [formError, setFormError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const changeHandler = (e) => {
		const { name, value } = e.target;

		setValues((state) => ({ ...state, [name]: value }));
		setErrors((state) => (state[name]?.length ? { ...state, [name]: [] } : state));
		setFormError((state) => (state ? '' : state));
	};

	const getSubmittedValues = () => {
		if (submitAllValues) {
			return values;
		}

		const updatedValues = {};
		const keys = Object.keys(initialValues);

		for (let i = 0; i < keys.length; i += 1) {
			const key = keys[i];

			if (values[key] !== initialValues[key]) {
				updatedValues[key] = values[key];
			}
		}

		return updatedValues;
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (isSubmitting) {
			return;
		}

		setFormError('');

		if (validate) {
			const { fields = {}, formError: validationFormError = '' } = validate(values);

			setErrors(fields);
			setFormError(validationFormError);

			if (Object.keys(fields).length || validationFormError) {
				return;
			}
		}

		setIsSubmitting(true);

		try {
			await onSubmitHandler(getSubmittedValues());
		} catch (requestError) {
			if (requestError?.fields) {
				const fieldErrors = {};

				Object.keys(requestError.fields).forEach((field) => {
					fieldErrors[field] = [requestError.fields[field]];
				});

				setErrors(fieldErrors);
			} else {
				setFormError(requestError?.error || 'Something went wrong. Please try again.');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		values,
		changeHandler,
		onSubmit,
		isSubmitting,
		errors,
		formError,
	};
};
