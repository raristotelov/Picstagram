import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
		console.log("in");
        e.preventDefault();

        onSubmitHandler(values);
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