/*jshint esversion: 8 */

const db = require("../models/index");
const Lib = require("../helpers/generalHelper");

module.exports = {
    CreateRace: async (request, h) => {
        let payload = request.payload;
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (
            Lib.RequireRole("admin", _decoded)
        ) {
            return await db.races.create(
                {
                    name: payload.name
                }
            )
                .then((race) => {
                    return { success: true, data: race };
                })
                .catch((err) => {
                    console.error(err);
                    return { success: false, error: err };
                });
        }
        else {
            return { success: false, error: "Unauthorized" }
        }
    },
    ReadRace: async (request, h) => {
        return await db.races.findByPk(request.params.raceId)
            .then(character => {
                if (character != null) {
                    return { success: true, data: character };
                }
                else {
                    return { success: false, message: "Could not find character" };
                }
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    SearchRace: async (_name) => {
        return await db.races.findOne({
            where: {
                "name": _name
            }
        })
            .then(race => {
                if (race != null) {
                    return { success: true, data: race };
                }
                else {
                    return { success: false, error: "Could not find character" };
                }
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    ReadAllRaces: async (request, h) => {
        return await db.races.findAll()
            .then(races => {
                return { success: true, data: races };
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    UpdateRace: async (request, h) => {
        let payload = request.payload;
        let params = request.params;
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (
            Lib.RequireRole("admin", _decoded)
        ) {
            let updateFields = ["name"];

            let promises = [
                db.races.update({
                    name: payload.name
                }, {
                    where: { id: params.raceId },
                    fields: updateFields
                }).catch((err) => console.error(err))
            ];

            return Promise.all(promises).catch(err => ({ success: false, error: err })).then(values => ({ success: true, data: values }));
        }
        else {
            return { success: false, error: "Unauthorized" }
        }
    },
    DeleteRace: async (request, h) => {
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (
            Lib.RequireRole("admin", _decoded)
        ) {
            return await db.races.destroy({
                where: {
                    id: request.params.raceId
                }
            })
                .then((res) => {
                    if (res == 1) {
                        return { success: true };
                    }
                    else {
                        return { success: false };
                    }
                })
                .catch((err) => {
                    console.error(err);
                    return { success: false, error: err };
                });
        }
        else {
            return { success: false, error: "Unauthorized" }
        }
    }
};