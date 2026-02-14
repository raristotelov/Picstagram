const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
	},
	profilePicture: {
		type: 'ObjectId',
		ref: 'UserImage',
	},
	posts: [
		{
			type: 'ObjectId',
			ref: 'UserImage',
		},
	],
	following: [
		{
			type: 'ObjectId',
			ref: 'User',
		},
	],
	followers: [
		{
			type: 'ObjectId',
			ref: 'User',
		},
	],
});

const model = mongoose.model('User', UserSchema);
module.exports = model;
