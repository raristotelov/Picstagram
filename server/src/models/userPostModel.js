const mongoose = require('mongoose');
const { create } = require('./userModel');

const UserPostSchema = new mongoose.Schema({
    imageIdentifier: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true,
		unique: true
    },
	userId: {
        type: 'ObjectId',
        ref: 'User',
    },
    likes: [{
		type: 'ObjectId',
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model('UserImage', UserPostSchema);
module.exports = model;