/*jshint esversion: 8 */
const Joi = require("@hapi/joi");
const Handler = require("../controllers/authController")

module.exports = {
  AuthenticateUser: {
    auth: false,
    handler: Handler.Authenticate,
    description: "Authenticates user",
    tags: ["api"],
    validate: {
      payload: {
        username: Joi.string().required().description("The username"),
        password: Joi.string().required().description("The password")
      }
    }
  },
};