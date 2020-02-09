/*jshint esversion: 8 */

const db = require("../models/index");
const Lib = require("../helpers/generalHelper");

module.exports = {
    CreateSpecialization: async (request, h) => {
        let payload = request.payload;
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (
            Lib.RequireRole("admin", _decoded)
        ) {
            return await db.specializations.create(
                {
                    class: payload.class,
                    name: payload.name,
                    raidrole: payload.raidrole
                }
            )
                .then((specialization) => {
                    return { success: true, data: specialization };
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
    ReadSpecialization: async (request, h) => {
        return await db.specializations.findByPk(request.params.specId)
            .then(specialization => {
                if (specialization != null) {
                    return { success: true, data: specialization };
                }
                else {
                    return { success: false, message: "Could not find specialization" };
                }
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    SearchSpecialization: async (_class, _name) => {
        return await db.specializations.findOne({
            where: {
                "class": _class,
                "name": _name
            }
        })
            .then(race => {
                if (race != null) {
                    return { success: true, data: race };
                }
                else {
                    return { success: false, error: "Could not find specialization" };
                }
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    ReadAllSpecializations: async (request, h) => {
        return await db.specializations.findAll()
            .then(specializations => {
                return { success: true, data: specializations };
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    UpdateSpecialization: async (request, h) => {
        let payload = request.payload;
        let params = request.params;
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (
            Lib.RequireRole("admin", _decoded)
        ) {
            let updateFields = [];
            if (payload.class) updateFields.push('class');
            if (payload.name) updateFields.push('name');
            if (payload.raidrole) updateFields.push('raidrole');

            let promises = [
                db.specializations.update({
                    class: payload.class,
                    name: payload.name,
                    raidrole: payload.raidrole
                }, {
                    where: { id: params.specId },
                    fields: updateFields
                }).catch((err) => console.error(err))
            ];

            return Promise.all(promises).catch(err => ({ success: false, error: err })).then(values => ({ success: true, data: values }));
        }
        else {
            return { success: false, error: "Unauthorized" }
        }
    },
    DeleteSpecialization: async (request, h) => {
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (
            Lib.RequireRole("admin", _decoded)
        ) {
            return await db.specializations.destroy({
                where: {
                    id: request.params.specId
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