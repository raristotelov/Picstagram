const UserImageModel = require('../models/userImageModel');
const UserModel = require("../models/userModel");

const getAllUserPosts = async (userId) => {
	try {
		const userPosts = await UserImageModel.find({ userId });

		return userPosts;
	} catch (error) {
		throw new Error("Something went wrong while trying get all posts of the user!");
	}
};

const addUserPost = async (postData, userId) => {
	try {
		const userPost = new UserImageModel({ imageIdentifier: postData.imageIdentifier, imageUrl: postData.imageUrl, userId });

		await userPost.save();

        await UserModel.findByIdAndUpdate(userId, {
            $addToSet: {
                posts: userPost._id
            }
        });

		return userPost;
	} catch (error) {
		throw new Error("Something went wrong while trying save the user post to the DB!");
	}
};

module.exports = {
	getAllUserPosts,
	addUserPost
};