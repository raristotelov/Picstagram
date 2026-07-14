// Central error handler. Logs the full original error server-side (including
// the preserved `cause`) and returns only a safe message + status to the client.
module.exports = (err, req, res, next) => {
	console.error(err);
	if (err.cause) {
		console.error('Caused by:', err.cause);
	}

	const statusCode = err.statusCode || 500;

	// Only expected (operational) errors expose their message; everything else
	// is treated as unexpected and hidden behind a generic message.
	const message = err.isOperational ? err.message : 'Something went wrong';

	res.status(statusCode).json({ error: message });
};
