const UserImageModel = require('../models/userImageModel');
const UserModel = require('../models/userModel');

const getAllUserPosts = async (userId) => {
	try {
		const userPosts = await UserImageModel.find({ userId });

		return userPosts;
	} catch (error) {
		throw new Error('Something went wrong while trying get all posts of the user!');
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
		throw new Error('Something went wrong while trying save the user post to the DB!');
	}
};

const getFollowedUsersPosts = async (userId) => {
	try {
		const userResult = await UserModel
			.find({ _id: userId })
			.select({ following: 1 })
			.populate({ path: 'following', populate: 'posts' })

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

module.exports = {
	getAllUserPosts,
	addUserPost,
	getFollowedUsersPosts
};