const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
		unique: true
    },
    password: {
        type: String,
        required: true
    },
	bio: {
		type: String
	},
	posts: [{
        type: 'ObjectId',
        ref: 'UserPost'
    }],
	following: [{
		type: 'ObjectId',
        ref: 'User'
	}],
	followers: [{
		type: 'ObjectId',
        ref: 'User'
	}]
});

const model = mongoose.model('User', UserSchema);
module.exports = model;