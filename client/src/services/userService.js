import { requestFactory } from './requester';
import { serverUrl } from "../constants/serverUrl";

export const signUp = (data) => {
	const request = requestFactory();

    return request.post(`${serverUrl}/users/sign-up`, data);
};

export const login = (data) => {
	const request = requestFactory();

    return request.post(`${serverUrl}/users/login`, data);
};

export const getUserProfileData = ({ userIds, searchWord, jwtToken }) => {
	const request = requestFactory(jwtToken);

	let requestUrl = `${serverUrl}/users?`;

	if (userIds?.length) {
		requestUrl = requestUrl.concat("userIds=", userIds.join(","));
	}

	if (searchWord) {
		requestUrl = requestUrl.concat("searchWord=", searchWord);
	}

	return request.get(requestUrl);
}

export const updateUserProfileData = ({ userId, jwtToken, updatedProfileData }) => {
	const request = requestFactory(jwtToken);

	return request.patch(`${serverUrl}/users/update/${userId}`, updatedProfileData);
}

export const followUser = ({ userId, userIdToFollow, jwtToken }) => {
	const request = requestFactory(jwtToken);

	return request.post(`${serverUrl}/users/${userId}/follow/${userIdToFollow}`);
}

export const unfollowUser = ({ userId, userIdToUnfollow, jwtToken }) => {
	const request = requestFactory(jwtToken);

	return request.post(`${serverUrl}/users/${userId}/unfollow/${userIdToUnfollow}`);
}
