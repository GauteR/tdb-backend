/*jshint esversion: 8 */
const Joi = require("@hapi/joi");
const Handler = require("../controllers/characterController");

module.exports = {
    Create: {
        handler: Handler.CreateCharacter,
        description: "Creates a character",
        tags: ["api"],
        validate: {
            payload: {
                "raceId": Joi.number().integer().required().description("The race identificator"),
                "specializationId": Joi.number().integer().required().description("The spec identificator"),
                "name": Joi.string().required().description("The character name"),
                "realm": Joi.string().required().description("The character realm"),
                "armoryLink": Joi.string().optional().description("The WoW armory link to the character"),
                "isMain": Joi.boolean().required().default(false).description("Is this the main character?")
            }
        }
    },
    Read: {
        handler: Handler.ReadCharacter,
        description: "Gets one character with the specific id",
        tags: ["api"],
        validate: {
            params: {
                "charId": Joi.number().integer().required().description("The character identificator"),
            }
        }
    },
    ReadAll: {
        handler: Handler.ReadAllCharacters,
        description: "Gets all characters",
        tags: ["api"]
    },
    Update: {
        handler: Handler.UpdateCharacter,
        description: "Updates a character",
        notes: "This request will overwrite current values for the character.",
        tags: ["api"],
        validate: {
            params: {
                "charId": Joi.number().integer().required().description("The character identificator"),
            },
            payload: {
                "raceId": Joi.number().integer().optional().description("The race identificator"),
                "specializationId": Joi.number().integer().optional().description("The spec identificator"),
                "name": Joi.string().optional().description("The character name"),
                "realm": Joi.string().optional().description("The character realm"),
                "armoryLink": Joi.string().optional().description("The WoW armory link to the character"),
                "isMain": Joi.boolean().optional().description("Is this the main character?")
            }
        }
    },
    Delete: {
        handler: Handler.DeleteCharacter,
        description: "Deletes a character",
        tags: ["api"],
        validate: {
            params: {
                "charId": Joi.number().integer().required().description("The character identificator"),
            }
        }
    }
};