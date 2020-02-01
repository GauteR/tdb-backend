/*jshint esversion: 8 */
require("dotenv").config();

module.exports =
{
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME_DEV,
    "host": process.env.DATABASE_URI,
    "dialect": "mariadb",
    "logging": console.info
  },
  "test": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME_TEST,
    "host": process.env.DATABASE_URI,
    "dialect": "mariadb",
    "logging": console.info
  },
  "production": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME_PROD,
    "host": process.env.DATABASE_URI,
    "dialect": "mariadb"
  }
};
