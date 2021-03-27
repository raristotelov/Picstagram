const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 5000,
        dbUrl: 'mongodb://localhost:27017/pictsagram',
        jwtSecret: 'fawf*F*A5(WHp9AHF{)WFA12_)AWJ(JN_}AM_)@.?3FA()JA@!$AWD23@'
    },
    production: {
        port: process.env.PORT || 5000,
        dbUrl: 'mongodb://localhost:27017/pictsagram',
    }
};

module.exports = config[env];