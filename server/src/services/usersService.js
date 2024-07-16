const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../models/userModel');
const UserImageModel = require('../models/userImageModel');
const constants = require('../config/constants');

const signUp = async ({ email, username, password }) => {
	try {

		const hashedPassword = await bcrypt.hash(password, constants.SALT_ROUNDS);

		const user = new UserModel({ email, username, password: hashedPassword });

		await user.save();

		return user;
	} catch(error) {
		throw new Error("Something went wrong while trying to sign up!");
	}
};

const login = async ({ email, password }) => {
	try {
		const dbUser = await UserModel.findOne({ email });

		const passwordIsCorrect = await bcrypt.compare(password, dbUser.password);

		if (!passwordIsCorrect) {
			throw new Error("Wrong email or password!");
		}

		const claim = {
			_id: dbUser._id,
			email: dbUser.email,
			username: dbUser.username
		};

		const jwt = JWT.sign(claim, constants.JWT_SECRET, {
			expiresIn: constants.JWT_EXPIRY
		});

		return {
			user: {
				_id: dbUser._id,
				email: dbUser.email,
				username: dbUser.username
			},
			jwt
		}
	} catch (error) {
		throw new Error("Something went wrong while trying to login!");
	}
};

const getUsersProfileDataByUserIds = async ({ userIds }) => {
	try {
		const users = await UserModel
			.find({ _id: { "$in": userIds } })
			.select({ "_id": 1, username: 1, email: 1, posts: 1, bio: 1, profilePicture: 1 })
			.populate({ path: "posts" }).populate({ path: "profilePicture" });

		return users;
	} catch (error) {
		throw new Error("Something went wrong while trying to get user accound data!");
	}
}

const getUsersProfileDataBySearchWord= async ({ searchWord }) => {
	try {
		const users = await UserModel
			.find({ "username": { $regex: `^${searchWord}`, $options: "i" } })
			.select({ "_id": 1, username: 1, email: 1, posts: 1, bio: 1, profilePicture: 1 })
			.populate({ path: "posts" }).populate({ path: "profilePicture" });

		return users;
	} catch (error) {
		console.log(error);
		throw new Error("Something went wrong while trying to get user accound data!");
	}
}

const updateUserProfileData = async (userId, updatedProfileData) => {
	try {
		let profilePicture = null;

		if (updatedProfileData.profilePicture) {
			const updatedProfilePicture = updatedProfileData.profilePicture;

			const userWithProfilePicture = await UserModel.findOne({ _id: userId }).populate({ path: "profilePicture" });

			if (userWithProfilePicture.profilePicture) {
				await UserImageModel.deleteOne({ _id: userWithProfilePicture.profilePicture._id });
			}

			profilePicture = new UserImageModel({ imageIdentifier: updatedProfilePicture.imageIdentifier, imageUrl: updatedProfilePicture.imageUrl, userId });

			await profilePicture.save();
		}

		if (profilePicture) {
			updatedProfileData.profilePicture = profilePicture._id;
		}

		const user = await UserModel
			.findOneAndUpdate(
				{ _id: userId },
				updatedProfileData,
				{ new: true }
			).populate("profilePicture");

		return user;
	} catch (error) {
		throw new Error("Something went wrong while trying to update user accound data!");
	}
}

module.exports = {
	signUp,
	login,
	getUsersProfileDataByUserIds,
	getUsersProfileDataBySearchWord,
	updateUserProfileData
};
