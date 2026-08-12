const { defineConfig } = require('cypress');

const { cleanTestUsers, deleteTestUser } = require('./cypress/support/testUsersDb');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		// Both the client (3000) and the server must be running before a spec starts.
		viewportWidth: 1440,
		viewportHeight: 900,
		setupNodeEvents(on) {
			on('task', {
				// Removes one account and all of its data. Rejects non-test addresses.
				deleteTestUser,
				// Sweeps every cypress+…@test.local account, for specs that died mid-run.
				cleanTestUsers,
			});
		},
	},
});
