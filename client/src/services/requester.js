import { HTTP } from '../constants';

const request = (method, url, data, idToken) => {
    let options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + idToken,
        },
    };

    if (data) {
        options = {
            ...options,
            body: JSON.stringify(data),
        };
    }

    return fetch(url, options);
};

const requester = {
    get: request.bind(null, HTTP.GET),
    post: request.bind(null, HTTP.POST),
    put: request.bind(null, HTTP.PUT),
    delete: request.bind(null, HTTP.DELETE),
    patch: request.bind(null, HTTP.PATCH),
};

export default requester;
