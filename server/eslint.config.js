module.exports = [
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'commonjs',
			globals: {
				require: 'readonly',
				module: 'readonly',
				process: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				console: 'readonly',
			},
		},
		rules: {
			semi: ['error', 'always'],
			quotes: ['error', 'single'],
			indent: ['error', 'tab'],
			'comma-dangle': ['error', 'always-multiline'],
			'max-len': ['error', { code: 150 }],
			'arrow-parens': ['error', 'always'],
			'no-multiple-empty-lines': ['error', { max: 1 }],
		},
	},
];
