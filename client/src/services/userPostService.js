import { requestFactory } from './requester';
import { serverUrl } from "../constants/serverUrl";

export const addUserPost = (data, jwtToken) => {
	const request = requestFactory(jwtToken);

    return request.post(`${serverUrl}/user-posts/add`, data);
};