const JWT = require('jsonwebtoken');

const constants = require('../config/constants');

module.exports = (req, res, next) => {
	const jwtToken = req.header('X-Authorization');

    if (jwtToken) {
        user = JWT.verify(jwtToken, constants.JWT_SECRET);

		res.userId = user.userId;

		next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}