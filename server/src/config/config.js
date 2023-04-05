const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 5000,
        dbUrl: 'mongodb://localhost:27017/pictsagram',
        jwtSecret: 'fawf*F*A5(WHp9AHF{)WFA12_)AWJ(JN_}AM_)@.?3FA()JA@!$AWD23@',
		secret = "mcgKttWi6M2OPYArgHip+zrfA44WhhfDigfzqcckrQSfKygRqqwnFRaSIDibLcXb7viEX4ZoAH5tLlNC1DNFOwTonNoOWUxCrMw6jd1hNfZ/WB2YBYT78bEH1jjab3iSJr49qshbh2c3l8huAX9YU2q1ba5b5qczvDbsfPnSUAyBjH8xaajOGyT1d3q8R2c9vyECieeiyE5T/F11cgDfCTQ8sE8XbXjJdnqEBC5kJyIneKx55ofyVVoZPLxvkVhbWgJxLm6fvEUohG6QGZpeDfBgLvf86eOBlzOb3lLaLiZDdff/UXgyE+1IScPqimDMA/uXfGJJ3sDkW1JZMxfh2A==";
    },
    production: {
        port: process.env.PORT || 5000,
        dbUrl: 'mongodb://localhost:27017/pictsagram',
    }
};

module.exports = config[env];