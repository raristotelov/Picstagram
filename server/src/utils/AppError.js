// Error for expected/handled failures. Carries an HTTP status code and a
// client-safe message. The original error (if any) is preserved via `cause`
// for server-side logging, and is never sent to the client.
// `options.fields` optionally maps form field names to their own message, so the
// client can show the error against the input that caused it.
class AppError extends Error {
	constructor(message, statusCode = 500, options = {}) {
		super(message, options); // options.cause is retained on this.cause
		this.name = 'AppError';
		this.statusCode = statusCode;
		this.isOperational = true;
		this.fields = options.fields;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

module.exports = AppError;
