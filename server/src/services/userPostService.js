const UserPostModel = require('../models/userPostModel');
const UserModel = require('../models/userModel');
const AppError = require('../utils/AppError');

const getAllUserPosts = async (userId) => {
	try {
		const userPosts = await UserPostModel.find({ userId });

		return userPosts;
	} catch (error) {
		throw new AppError('Could not load user posts', 500, { cause: error });
	}
};

const addUserPost = async (postData, userId) => {
	try {
		const userPost = new UserPostModel({
			imageIdentifier: postData.imageIdentifier,
			imageUrl: postData.imageUrl,
			caption: postData.caption,
			userId,
		});

		await userPost.save();

		await UserModel.findByIdAndUpdate(userId, {
			$addToSet: {
				posts: userPost._id,
			},
		});

		return userPost;
	} catch (error) {
		throw new AppError('Could not save the user post', 500, { cause: error });
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
		throw new AppError('Could not load followed users posts', 500, { cause: error });
	}
};

const likeUserPost = async ({ userPostId, userWhoLikedId }) => {
	try {
		const updatedUserPostData = await UserPostModel.findOneAndUpdate({ _id: userPostId }, { $push: { likes: userWhoLikedId } }, { new: true });

		return updatedUserPostData;
	} catch (error) {
		throw new AppError('Could not like the post', 500, { cause: error });
	}
};

const unlikeUserPost = async ({ userPostId, userWhoUnlikedId }) => {
	try {
		const updatedUserPostData = await UserPostModel.findOneAndUpdate({ _id: userPostId }, { $pull: { likes: userWhoUnlikedId } }, { new: true });

		return updatedUserPostData;
	} catch (error) {
		throw new AppError('Could not unlike the post', 500, { cause: error });
	}
};

module.exports = {
	getAllUserPosts,
	addUserPost,
	getFollowedUsersPosts,
	likeUserPost,
	unlikeUserPost,
};
