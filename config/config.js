/*jshint esversion: 8 */

module.exports =
{
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME+"-dev",
    "host": process.env.DATABASE_URI,
    "dialect": process.env.DATABASE_DIALECT,
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME+"-test",
    "host": process.env.DATABASE_URI,
    "dialect": process.env.DATABASE_DIALECT,
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_URI,
    "dialect": process.env.DATABASE_DIALECT,
    "operatorsAliases": false
  }
};
