/*jshint esversion: 8 */
const Joi = require("@hapi/joi");
const Handler = require("../controllers/raceController");

module.exports = {
    Create: {
        handler: Handler.CreateRace,
        description: "Creates a race",
        tags: ["api"],
        validate: {
            payload: {
                "name": Joi.string().required().description("The name of the race")
            }
        }
    },
    Read: {
        auth: false,
        handler: Handler.ReadRace,
        description: "Gets one race with the specific id",
        tags: ["api"],
        validate: {
            params: {
                "raceId": Joi.number().integer().required().description("The race identificator"),
            }
        }
    },
    ReadAll: {
        auth: false,
        handler: Handler.ReadAllRaces,
        description: "Gets all races",
        tags: ["api"]
    },
    Update: {
        handler: Handler.UpdateRace,
        description: "Updates a race",
        notes: "This request will overwrite current values for the character.",
        tags: ["api"],
        validate: {
            params: {
                "raceId": Joi.number().integer().required().description("The race identificator"),
            },
            payload: {
                "name": Joi.string().required().description("The name of the race")
            }
        }
    },
    Delete: {
        handler: Handler.DeleteRace,
        description: "Deletes a race",
        tags: ["api"],
        validate: {
            params: {
                "raceId": Joi.number().integer().required().description("The race identificator"),
            }
        }
    }
};