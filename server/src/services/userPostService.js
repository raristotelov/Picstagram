const UserPostModel = require('../models/userPostModel');

const addUserPost = async (postData, userId) => {
	try {
		const userPost = new UserPostModel({ imageIdentifier: postData.imageIdentifier, imageUrl: postData.imageUrl, userId });

		await userPost.save();

		return userPost;
	} catch (error) {
		throw new Error("Something went wrong while trying save the user post to the DB!");
	}
};

module.exports = {
	addUserPost
};