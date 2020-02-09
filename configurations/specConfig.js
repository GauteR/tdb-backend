/*jshint esversion: 8 */
const Joi = require("@hapi/joi");
const Handler = require("../controllers/specController");

module.exports = {
    Create: {
        handler: Handler.CreateSpecialization,
        description: "Creates a specialization",
        tags: ["api"],
        validate: {
            payload: {
                "class": Joi.string().required().description("The class of the character"),
                "name": Joi.string().required().description("The name of the specialization"),
                "raidrole": Joi.string().required().description("The character's role in the raid")
            }
        }
    },
    Read: {
        auth: false,
        handler: Handler.ReadSpecialization,
        description: "Gets one specialization with the specific id",
        tags: ["api"],
        validate: {
            params: {
                "specId": Joi.number().integer().required().description("The specialization identificator"),
            }
        }
    },
    ReadAll: {
        auth: false,
        handler: Handler.ReadAllSpecializations,
        description: "Gets all specializations",
        tags: ["api"]
    },
    Update: {
        handler: Handler.UpdateSpecialization,
        description: "Updates a specialization",
        notes: "This request will overwrite current values for the character.",
        tags: ["api"],
        validate: {
            params: {
                "specId": Joi.number().integer().required().description("The specialization identificator"),
            },
            payload: {
                "class": Joi.string().optional().description("The class of the character"),
                "name": Joi.string().optional().description("The name of the specialization"),
                "raidrole": Joi.string().optional().description("The character's role in the raid")
            }
        }
    },
    Delete: {
        handler: Handler.DeleteSpecialization,
        description: "Deletes a specialization",
        tags: ["api"],
        validate: {
            params: {
                "specId": Joi.number().integer().required().description("The specialization identificator"),
            }
        }
    }
};