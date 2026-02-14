const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		port: process.env.PORT || 5000,
		dbUrl: process.env.MONGODB_URI,
	},
	production: {
		port: process.env.PORT || 5000,
		dbUrl: process.env.MONGODB_URI,
	},
};

module.exports = config[env];
