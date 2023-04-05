import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
	const [state, setState] = useState(() => {
		const persistedStateSerialized = localStorage.getItem(key);

		if (persistedStateSerialized) {
			const persistedState = JSON.parse(persistedStateSerialized);

			return persistedState;
		}

		return initialValue;
	});

	const setLocalStorageState = (value) => {
		setState(value);

		localStorage.setItem(key, JSON.stringify(value));
	};

	return [
		state,
		setLocalStorageState
	];
}

export default useLocalStorage