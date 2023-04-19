const mongoose = require('mongoose');

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
});

const model = mongoose.model('UserPost', UserPostSchema);
module.exports = model;