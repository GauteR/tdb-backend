/*jshint esversion: 8 */
const Joi = require("@hapi/joi");
const Handler = require("../controllers/raidController");

module.exports = {
    Create: {
        handler: Handler.CreateRaid,
        description: "Creates a new raid",
        tags: ["api"],
        validate: {
            payload: {
                "name": Joi.string().required().description("The raid name"),
                "desc": Joi.string().optional().description("The raid description"),
                "diff": Joi.string().allow(["Normal","Heroic","Mythic"]).default("Heroic").optional().description("The raid difficulty"),
                "planned": Joi.date().required().description("Time and date of the raid"),
                "minTanks": Joi.number().integer().optional().description("Minimum amount of tanks required"),
                "minHealers": Joi.number().integer().optional().description("Minimum amount of healers required"),
                "minMelee": Joi.number().integer().optional().description("Minimum amount of melee damage dealers required"),
                "minRanged": Joi.number().integer().optional().description("Minimum amount of ranged damage dealers required"),
                "recGear": Joi.string().optional().description("Recommended gear level"),
                "announce": Joi.boolean().default(true).required().description("Should this raid be announced to Discord?")
            }
        }
    },
    Read: {
        auth: false,
        handler: Handler.ReadRaid,
        description: "Gets a specific raid info",
        tags: ["api"],
        cache: {
            expiresIn: 5000, // 5 seconds
            privacy: "public"
        },
        validate: {
            params: {
                "raidId": Joi.number().integer().required().description("The raid identificator")
            }
        }
    },
    ReadAll: {
        auth: false,
        handler: Handler.ReadAllRaids,
        description: "Gets a list of all raids",
        cache: {
            expiresIn: 5000, // 5 seconds
            privacy: "public"
        },
        tags: ["api"]
    },
    Update: {
        handler: Handler.UpdateRaid,
        description: "Updates raid info of a specified raid",
        notes: "This request will overwrite current values for the raid.",
        tags: ["api"],
        validate: {
            params: {
                "raidId": Joi.number().integer().required().description("The raid identificator")
            },
            payload: {
                "name": Joi.string().optional().description("The raid name"),
                "desc": Joi.string().optional().description("The raid description"),
                "diff": Joi.string().allow(["Normal","Heroic","Mythic"]).optional().description("The raid difficulty"),
                "planned": Joi.date().optional().description("Time and date of the raid"),
                "minTanks": Joi.number().integer().optional().description("Minimum amount of tanks required"),
                "minHealers": Joi.number().integer().optional().description("Minimum amount of healers required"),
                "minMelee": Joi.number().integer().optional().description("Minimum amount of melee damage dealers required"),
                "minRanged": Joi.number().integer().optional().description("Minimum amount of ranged damage dealers required"),
                "recGear": Joi.string().optional().description("Recommended gear level"),
                "announce": Joi.boolean().optional().description("Should this raid be announced to Discord?")
            }
        }
    },
    Delete: {
        handler: Handler.DeleteRaid,
        description: "Deletes a raid",
        tags: ["api"],
        validate: {
            params: {
                "raidId": Joi.number().integer().required().description("The raid identificator")
            }
        }
    },
    GenerateInvites: {
        handler: Handler.GenerateInvites,
        description: "Generates invites for a specified raid",
        tags: ["api"],
        validate: {
            params: {
                "raidId": Joi.number().integer().required().description("The raid identificator")
            }
        }
    },
    Signup: {
        handler: Handler.RaidSignup,
        description: "Signs up the character for a raid",
        tags: ["api"],
        validate: {
            params: {
                "raidId": Joi.number().integer().required().description("The raid identificator"),
            },
            payload: {
                "charId": Joi.number().integer().required().description("The character identifier"),
                "statusId": Joi.number().integer().required().description("The status identifier"),
            }
        }
    },
    ManageSignup: {
        handler: Handler.ManageSignup,
        description: "Manage the specified signup for a raid",
        tags: ["api"],
        validate: {
            params: {
                "raidId": Joi.number().integer().required().description("The raid identificator"),
                "charId": Joi.number().integer().required().description("The character identifier"),
            },
            payload: {
                "statusId": Joi.number().integer().required().description("The status identifier"),
            }
        }
    }
};