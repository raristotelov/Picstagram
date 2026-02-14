const mongoose = require('mongoose');

const UserPostModel = require('../models/userPostModel');
const UserModel = require('../models/userModel');

const getAllUserPosts = async (userId) => {
	try {
		const userPosts = await UserPostModel.find({ userId });

		return userPosts;
	} catch (error) {
		throw new Error('Something went wrong while trying get all posts of the user!');
	}
};

const addUserPost = async (postData, userId) => {
	try {
		const userPost = new UserPostModel({ imageIdentifier: postData.imageIdentifier, imageUrl: postData.imageUrl, userId });

		await userPost.save();

		const result = await UserModel.findByIdAndUpdate(userId, {
			$addToSet: {
				posts: userPost._id,
			},
		});

		return userPost;
	} catch (error) {
		throw new Error('Something went wrong while trying save the user post to the DB!');
	}
};

const getFollowedUsersPosts = async (userId) => {
	try {
		const userResult = await UserModel.find({ _id: userId }).select({ following: 1 }).populate({ path: 'following', populate: 'posts' });

		const currentUser = userResult[0];

		const currentUserFollowedUsers = currentUser.following;

		const followedUsersPosts = [];

		for (let i = 0; i < currentUserFollowedUsers.length; i += 1) {
			const followedUser = currentUserFollowedUsers[i];

			if (followedUser?.posts?.length) {
				followedUsersPosts.push(...followedUser.posts);
			}
		}

		return followedUsersPosts;
	} catch (error) {
		throw new Error('Something went wrong while trying save the user post to the DB!');
	}
};

const likeUserPost = async ({ userPostId, userWhoLikedId }) => {
	try {
		const updatedUserPostData = await UserPostModel.findOneAndUpdate({ _id: userPostId }, { $push: { likes: userWhoLikedId } }, { new: true });

		return updatedUserPostData;
	} catch (error) {
		throw new Error('Something went wrong while trying to like user!');
	}
};

const unlikeUserPost = async ({ userPostId, userWhoUnlikedId }) => {
	try {
		const updatedUserPostData = await UserPostModel.findOneAndUpdate({ _id: userPostId }, { $pull: { likes: userWhoUnlikedId } }, { new: true });

		return updatedUserPostData;
	} catch (error) {
		throw new Error('Something went wrong while trying to unlike user!');
	}
};

module.exports = {
	getAllUserPosts,
	addUserPost,
	getFollowedUsersPosts,
	likeUserPost,
	unlikeUserPost,
};
