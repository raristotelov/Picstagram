import JWT from "jsonwebtoken";

module.exports = (req, res, next) => {
    if (req.header('Authorization')) {
        const idToken = req.header('Authorization').split(' ')[1] || req.header('Authorization');

        user = JWT.verify(jwt, jwtSecret);

		next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}