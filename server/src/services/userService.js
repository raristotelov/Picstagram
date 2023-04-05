import JWT from "jsonwebtoken";

const signUp = () => {
	const claim = {
		id: user.id,
	
	};

	const jwt = JWT.sign(claim, jwtSecret, {
		expiresIn: jwtExpiry
	});
}

module.exports = {
	signUp
};