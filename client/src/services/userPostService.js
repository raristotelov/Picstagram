import { requestFactory } from './requester';
import { serverUrl } from "../constants/serverUrl";

export const getAllUserPosts = (jwtToken) => {
	const request = requestFactory(jwtToken);

    return request.get(`${serverUrl}/user-posts`);
};

export const addUserPost = (data, jwtToken) => {
	const request = requestFactory(jwtToken);

    return request.post(`${serverUrl}/user-posts`, data);
};

export const getFollowedUsersPosts = ({ jwtToken }) => {
    const request = requestFactory(jwtToken);

    return request.get(`${serverUrl}/user-posts/followed-users-posts`)
}