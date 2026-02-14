const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
	return mongoose
		.connect(config.dbUrl)
		.then(() => {
			console.log('Database connected.');
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
};
