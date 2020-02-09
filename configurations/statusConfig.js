/*jshint esversion: 8 */
const Joi = require("@hapi/joi");
const Handler = require("../controllers/statusController");

module.exports = {
    Create: {
        handler: Handler.CreateStatus,
        description: "Creates a status",
        tags: ["api"],
        validate: {
            payload: {
                "name": Joi.string().required().description("The name of the status")
            }
        }
    },
    Read: {
        auth: false,
        handler: Handler.ReadStatus,
        description: "Gets one status with the specific id",
        tags: ["api"],
        validate: {
            params: {
                "statusId": Joi.number().integer().required().description("The status identificator"),
            }
        }
    },
    ReadAll: {
        auth: false,
        handler: Handler.ReadAllStatuses,
        description: "Gets all statuses",
        tags: ["api"]
    },
    Update: {
        handler: Handler.UpdateStatus,
        description: "Updates a status",
        notes: "This request will overwrite current values for the character.",
        tags: ["api"],
        validate: {
            params: {
                "statusId": Joi.number().integer().required().description("The status identificator"),
            },
            payload: {
                "name": Joi.string().required().description("The name of the status"),
            }
        }
    },
    Delete: {
        handler: Handler.DeleteStatus,
        description: "Deletes a status",
        tags: ["api"],
        validate: {
            params: {
                "statusId": Joi.number().integer().required().description("The status identificator"),
            }
        }
    }
};