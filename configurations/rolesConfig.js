/*jshint esversion: 8 */
const Joi = require("@hapi/joi");
const Handler = require("../controllers/rolesController")

module.exports = {
  Create: {
    handler: Handler.CreateRole,
    description: "Adds the selected role to the selected user",
    tags: ["api"],
    validate: {
        params: {
            "userId": Joi.number().integer().required().description("The user identificator"),
        },
        payload: {
            "roleId": Joi.number().integer().required().description("The role identificator that should be added to the user"),
        }
    }
  },
  ReadAll: {
    auth: false,
    handler: Handler.ReadAllRoles,
    description: "Gets all valid roles",
    tags: ["api"]
  },
  Read: {
    handler: Handler.GetRoles,
    description: "Gets the roles of the selected user",
    tags: ["api"],
    validate: {
        params: {
            "userId": Joi.number().integer().required().description("The user identificator"),
        }
    }
  },
  Delete: {
    auth: false, // TODO remove
    handler: Handler.DeleteRole,
    description: "Removes the selected role from the selected user",
    tags: ["api"],
    validate: {
        params: {
          "userId": Joi.number().integer().required().description("The user identificator"),
        },
        payload: {
          "roleId": Joi.number().integer().required().description("The role identificator that should be removed from the user"),
        }
    }
  },
};