import { requestFactory } from './requester';
import { serverUrl } from "../constants/serverUrl";

export const signUp = (data) => {
	const request = requestFactory();

    return request.post(`${serverUrl}/user/sign-up`, data);
};

export const login = (data) => {
	const request = requestFactory();

    return request.post(`${serverUrl}/user/login`, data);
};

export const getUserAccountData = (userId, jwtToken) => {
	const request = requestFactory(jwtToken);

	return request.get(`${serverUrl}/user?userId=${userId}`);
}

export const updateUserProfileData = (userId, jwtToken, updatedProfileData) => {
	const request = requestFactory(jwtToken);

	return request.post(`${serverUrl}/user/update?userId=${userId}`, updatedProfileData);
}
