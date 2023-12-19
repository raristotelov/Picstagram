const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../models/userModel');
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

		// if (!passwordIsCorrect) {
		// 	throw new Error("Wrong email or password!");
		// }

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

const getUserAccoutData = async (userId) => {
	try {
		const user = await UserModel.find({ _id: userId }).select({ "_id": 1, username: 1, email: 1, posts: 1 }).populate({ path: "posts" });

		return user;
	} catch (error) {
		throw new Error("Something went wrong while trying get user accound data!");
	}
}

module.exports = {
	signUp,
	login,
	getUserAccoutData
};
