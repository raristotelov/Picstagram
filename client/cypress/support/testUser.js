// Test accounts are identifiable by this prefix so the cleanup task can find them,
// and so anything left behind by a spec that dies mid-run is still recognisable.
const TEST_EMAIL_PREFIX = 'cypress+';
const TEST_EMAIL_DOMAIN = '@test.local';
const TEST_USERNAME_PREFIX = 'cypress_';

const buildTestUser = (overrides = {}) => {
	const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

	return {
		email: `${TEST_EMAIL_PREFIX}${unique}${TEST_EMAIL_DOMAIN}`,
		username: `${TEST_USERNAME_PREFIX}${unique}`,
		password: 'CypressPassword1',
		...overrides,
	};
};

module.exports = {
	TEST_EMAIL_PREFIX,
	TEST_EMAIL_DOMAIN,
	TEST_USERNAME_PREFIX,
	buildTestUser,
};
