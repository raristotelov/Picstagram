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
	}
});

const model = mongoose.model('User', UserSchema);
module.exports = model;