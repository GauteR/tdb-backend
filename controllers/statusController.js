/*jshint esversion: 8 */

const db = require("../models/index");
const Lib = require("../helpers/generalHelper");

module.exports = {
    CreateStatus: async (request, h) => {
        let payload = request.payload;
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (
            Lib.RequireRole("admin", _decoded)
        ) {
            return await db.status.create(
                {
                    name: payload.name
                }
            )
                .then((status) => {
                    return { success: true, data: status };
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
    ReadStatus: async (request, h) => {
        return await db.status.findByPk(request.params.statusId)
            .then(status => {
                if (status != null) {
                    return { success: true, data: status };
                }
                else {
                    return { success: false, message: "Could not find status" };
                }
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    SearchStatus: async (_name) => {
        return await db.status.findOne({
            where: {
                "name": _name
            }
        })
            .then(status => {
                if (status != null) {
                    return { success: true, data: status };
                }
                else {
                    return { success: false, error: "Could not find status" };
                }
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    ReadAllStatuses: async (request, h) => {
        return await db.status.findAll()
            .then(statuses => {
                return { success: true, data: statuses };
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    UpdateStatus: async (request, h) => {
        let payload = request.payload;
        let params = request.params;
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (
            Lib.RequireRole("admin", _decoded)
        ) {
            let updateFields = [];
            if (payload.name) updateFields.push('name');

            let promises = [
                db.status.update({
                    name: payload.name
                }, {
                    where: { id: params.statusId },
                    fields: updateFields
                }).catch((err) => console.error(err))
            ];

            return Promise.all(promises).catch(err => ({ success: false, error: err })).then(values => ({ success: true, data: values }));
        }
        else {
            return { success: false, error: "Unauthorized" }
        }
    },
    DeleteStatus: async (request, h) => {
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (
            Lib.RequireRole("admin", _decoded)
        ) {
            return await db.status.destroy({
                where: {
                    id: request.params.statusId
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