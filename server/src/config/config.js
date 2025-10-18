const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 5001,
    dbUrl: "mongodb://localhost:27017/pictsagram",
  },
  production: {
    port: process.env.PORT || 5001,
    dbUrl: "mongodb://localhost:27017/pictsagram",
  },
};

module.exports = config[env];
