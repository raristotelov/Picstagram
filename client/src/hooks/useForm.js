import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
	const [values, setValues] = useState(initialValues);

	const changeHandler = (e) => {
		setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const updatedValues = {};

		for (let i = 0; i < Object.keys(initialValues).length; i++) {
			const key = Object.keys(initialValues)[i];

			if (values[key] !== initialValues[key]) {
				updatedValues[key] = values[key];
			}
		}

		onSubmitHandler(updatedValues);
	};

	// TODO remove if not needed
	// const changeValues = (newValues) => {
	//     // TODO: Validate newValues shape (like initialValues)

	//     setValues(newValues);
	// };

	return {
		values,
		changeHandler,
		onSubmit,
		// changeValues,
	};
};
