/*jshint esversion: 8 */
const Joi = require("@hapi/joi");
const Handler = require("../controllers/userController")

module.exports = {
    Create: {
        auth: false, // TODO Remove this once authentication is in place
        handler: Handler.CreateUser,
        description: "Creates a new user",
        tags: ["api"],
        validate: {
            payload: {
                "username": Joi.string().required().description("The username"),
                "password": Joi.string().required().description("The user's password"),
                "email": Joi.string().email({ minDomainSegments: 2 }).required().description("The user's email"),
                "role": Joi.string().required().description("The user's role")
            }
        }
    },
    Read: {
        auth: false, // TODO Remove this once authentication is in place
        handler: Handler.ReadUser,
        description: "Gets a specific user's info",
        tags: ["api"],
        cache: {
            expiresIn: 5000, // 5 seconds
            privacy: "public"
        },
        validate: {
            params: {
                "userId": Joi.number().integer().required().description("The user identificator")
            }
        }
    },
    ReadAll: {
        auth: false, // TODO Remove this once authentication is in place
        handler: Handler.ReadAllUsers,
        description: "Gets a list of all users",
        tags: ["api"]
    },
    Update: {
        auth: false, // TODO Remove this once authentication is in place
        handler: Handler.UpdateUser,
        description: "Updates user info of a specified user",
        notes: "This request will overwrite current values for the user.",
        tags: ["api"],
        validate: {
            params: {
                "userId": Joi.number().integer().required().description("The user identificator")
            },
            payload: {
                "username": Joi.string().optional().description("The username"),
                "password": Joi.string().optional().description("The user's password"),
                "email": Joi.string().email({ minDomainSegments: 2 }).optional().description("The user's email"),
                "role": Joi.string().optional().description("The user's role")
            }
        }
    },
    Delete: {
        auth: false, // TODO Remove this once authentication is in place
        handler: Handler.DeleteUser,
        description: "Deletes a user",
        tags: ["api"],
        validate: {
            params: {
                "userId": Joi.number().integer().required().description("The user identificator")
            }
        }
    }
};