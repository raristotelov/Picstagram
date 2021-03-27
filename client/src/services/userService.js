import request from './requester';
import firebase from '../firebase';

export const signUp = (data) => {
    return request.post(`${SERVER_ADDRESS}/user/signup`, data);
}

export const createDbUser = (data, idToken) => {
    return request.post(`${SERVER_ADDRESS}/user/createdbuser`, data, idToken);
}