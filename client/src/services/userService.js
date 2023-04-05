import { requestFactory } from './requester';
import { serverUrl } from "../constants/serverUrl";

export const signUp = (data) => {
	const request = requestFactory();

    return request.post(`${serverUrl}/users/sign-up`, data);
}

export const login = (data) => {
	const request = requestFactory();

    return request.post(`${serverUrl}/users/login`, data);
}
