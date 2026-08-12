jest.mock('../models/userModel');
jest.mock('../models/userPostModel');
jest.mock('./commentService');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const UserModel = require('../models/userModel');
const constants = require('../config/constants');
const AppError = require('../utils/AppError');
const { login, signUp } = require('./userService');

describe('userService', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('login', () => {
		it('rejects with a 401 when no user matches the given email', async () => {
			UserModel.findOne = jest.fn().mockResolvedValue(null);

			await expect(login({ email: 'nobody@example.com', password: 'irrelevant' })).rejects.toMatchObject({
				statusCode: 401,
				message: 'Wrong email or password',
			});
		});

		it('rejects with a 401 when bcrypt.compare resolves false (regression: password check must not be skipped)', async () => {
			UserModel.findOne = jest.fn().mockResolvedValue({ _id: 'user1', username: 'realuser', password: 'hashedPassword' });
			bcrypt.compare.mockResolvedValue(false);

			await expect(login({ email: 'realuser@example.com', password: 'wrongPassword' })).rejects.toMatchObject({
				statusCode: 401,
				message: 'Wrong email or password',
			});

			expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
		});

		it('uses the identical message for an unknown email and a wrong password, so it does not leak which field was wrong', async () => {
			UserModel.findOne = jest.fn().mockResolvedValueOnce(null);

			let unknownEmailError;

			try {
				await login({ email: 'nobody@example.com', password: 'irrelevant' });
			} catch (error) {
				unknownEmailError = error;
			}

			UserModel.findOne = jest.fn().mockResolvedValueOnce({ _id: 'user1', username: 'realuser', password: 'hashedPassword' });
			bcrypt.compare.mockResolvedValueOnce(false);

			let wrongPasswordError;

			try {
				await login({ email: 'realuser@example.com', password: 'wrongPassword' });
			} catch (error) {
				wrongPasswordError = error;
			}

			expect(unknownEmailError.message).toBe(wrongPasswordError.message);
			expect(unknownEmailError.statusCode).toBe(wrongPasswordError.statusCode);
			expect(unknownEmailError.fields).toBeUndefined();
			expect(wrongPasswordError.fields).toBeUndefined();
		});

		it('resolves with a signed JWT when the email and password are both correct', async () => {
			const dbUser = { _id: 'user1', username: 'realuser', password: 'hashedPassword' };

			UserModel.findOne = jest.fn().mockResolvedValue(dbUser);
			bcrypt.compare.mockResolvedValue(true);
			JWT.sign.mockReturnValue('signed.jwt.token');

			const result = await login({ email: 'realuser@example.com', password: 'correctPassword' });

			expect(bcrypt.compare).toHaveBeenCalledWith('correctPassword', 'hashedPassword');
			expect(JWT.sign).toHaveBeenCalledWith({ userId: 'user1', username: 'realuser' }, process.env.JWT_SECRET, {
				expiresIn: constants.JWT_EXPIRY,
			});
			expect(result).toBe('signed.jwt.token');
		});

		it('wraps an unexpected error (e.g. a database failure) in a 500 AppError', async () => {
			const dbError = new Error('connection lost');

			UserModel.findOne = jest.fn().mockRejectedValue(dbError);

			await expect(login({ email: 'realuser@example.com', password: 'irrelevant' })).rejects.toMatchObject({
				statusCode: 500,
				message: 'Could not log in',
				cause: dbError,
			});
		});
	});

	describe('signUp', () => {
		const buildUserModelMock = (saveImplementation) => {
			UserModel.mockImplementation(function UserModelMock(data) {
				Object.assign(this, data);
				this._id = 'mockUserId';
				this.save = saveImplementation;
			});
		};

		beforeEach(() => {
			bcrypt.hash.mockResolvedValue('hashedPassword123');
		});

		it('throws a 400 when the password is shorter than MIN_PASSWORD_LENGTH', async () => {
			const expectedMessage = `Password must be at least ${constants.MIN_PASSWORD_LENGTH} characters`;

			await expect(signUp({ email: 'a@b.com', username: 'newuser', password: 'short' })).rejects.toMatchObject({
				statusCode: 400,
				message: expectedMessage,
				fields: { password: expectedMessage },
			});

			expect(bcrypt.hash).not.toHaveBeenCalled();
		});

		it('throws a 400 when the password exceeds MAX_PASSWORD_BYTES measured in bytes, not characters', async () => {
			// Each 'é' (é) is 1 character but 2 bytes in UTF-8: 40 chars -> 80 bytes.
			const multiByteOverLimitPassword = 'é'.repeat(40);

			expect(multiByteOverLimitPassword.length).toBe(40);
			expect(Buffer.byteLength(multiByteOverLimitPassword, 'utf8')).toBe(80);

			const expectedMessage = `Password must be at most ${constants.MAX_PASSWORD_BYTES} bytes`;

			await expect(signUp({ email: 'a@b.com', username: 'newuser', password: multiByteOverLimitPassword })).rejects.toMatchObject({
				statusCode: 400,
				message: expectedMessage,
				fields: { password: expectedMessage },
			});

			expect(bcrypt.hash).not.toHaveBeenCalled();
		});

		it('returns a signed JWT so the client can log the new user straight in', async () => {
			buildUserModelMock(jest.fn().mockResolvedValue(undefined));
			JWT.sign.mockReturnValue('signed.jwt.token');

			const result = await signUp({ email: 'a@b.com', username: 'newuser', password: 'validPassword1' });

			expect(result).toBe('signed.jwt.token');
			expect(JWT.sign).toHaveBeenCalledWith({ userId: 'mockUserId', username: 'newuser' }, process.env.JWT_SECRET, {
				expiresIn: constants.JWT_EXPIRY,
			});
		});

		it('hashes the password before saving, so the raw value is never stored', async () => {
			buildUserModelMock(jest.fn().mockResolvedValue(undefined));

			await signUp({ email: 'a@b.com', username: 'newuser', password: 'validPassword1' });

			expect(bcrypt.hash).toHaveBeenCalledWith('validPassword1', constants.SALT_ROUNDS);
			expect(UserModel).toHaveBeenCalledWith(expect.objectContaining({ password: 'hashedPassword123' }));
			expect(UserModel).not.toHaveBeenCalledWith(expect.objectContaining({ password: 'validPassword1' }));
		});

		it('rethrows an AppError from the try block unchanged (e.g. the password length validation error)', async () => {
			const expectedMessage = `Password must be at least ${constants.MIN_PASSWORD_LENGTH} characters`;

			let thrown;

			try {
				await signUp({ email: 'a@b.com', username: 'newuser', password: 'short' });
			} catch (error) {
				thrown = error;
			}

			expect(thrown).toBeInstanceOf(AppError);
			expect(thrown.statusCode).toBe(400);
			expect(thrown.message).toBe(expectedMessage);
		});

		it('converts a Mongoose ValidationError into a 400 with fields keyed by the failing path', async () => {
			const validationError = new Error('User validation failed');

			validationError.name = 'ValidationError';
			validationError.errors = {
				email: { message: 'Please provide a valid email address' },
				username: { message: 'Path `username` is required.' },
			};

			buildUserModelMock(jest.fn().mockRejectedValue(validationError));

			await expect(signUp({ email: 'bad-email', username: '', password: 'validPassword1' })).rejects.toMatchObject({
				statusCode: 400,
				message: 'Please provide a valid email address, Path `username` is required.',
				fields: {
					email: 'Please provide a valid email address',
					username: 'Path `username` is required.',
				},
			});
		});

		it('converts a Mongo duplicate-key error on email into a 409 with fields.email', async () => {
			const duplicateKeyError = new Error('E11000 duplicate key error');

			duplicateKeyError.code = 11000;
			duplicateKeyError.keyPattern = { email: 1 };

			buildUserModelMock(jest.fn().mockRejectedValue(duplicateKeyError));

			await expect(signUp({ email: 'taken@example.com', username: 'newuser', password: 'validPassword1' })).rejects.toMatchObject({
				statusCode: 409,
				fields: { email: 'This email is already registered' },
			});
		});

		it('converts a Mongo duplicate-key error on username into a 409 with fields.username', async () => {
			const duplicateKeyError = new Error('E11000 duplicate key error');

			duplicateKeyError.code = 11000;
			duplicateKeyError.keyPattern = { username: 1 };

			buildUserModelMock(jest.fn().mockRejectedValue(duplicateKeyError));

			await expect(signUp({ email: 'a@b.com', username: 'takenname', password: 'validPassword1' })).rejects.toMatchObject({
				statusCode: 409,
				fields: { username: 'This username is taken' },
			});
		});

		it('wraps an unexpected save error in a 500 AppError', async () => {
			const dbError = new Error('connection lost');

			buildUserModelMock(jest.fn().mockRejectedValue(dbError));

			await expect(signUp({ email: 'a@b.com', username: 'newuser', password: 'validPassword1' })).rejects.toMatchObject({
				statusCode: 500,
				message: 'Could not sign up',
				cause: dbError,
			});
		});
	});
});
