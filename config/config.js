// in ./config/config.js
const fs = require('fs')
require('dotenv').config()

module.exports = {
  development: {
    // add the key/values pairs from your config.json here
    "database": "game_db",
    "username": "sequelize",
    "password": "sequelize",
    "host": "postgres",
    "dialect": "postgres"
  },
  production: {
    "use_env_variable": "DATABASE_URI",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}