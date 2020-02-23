/*jshint esversion: 8 */
const Pack = require("../package");
const Lib = require("../helpers/generalHelper");
const db = require("../models/index");

module.exports = {
    CreateRole: async (request, h) => {
        let payload = request.payload;
        let params = request.params;
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("officer", _decoded)) {
            return db.user_roles.findOrCreate({
                where: {
                    "userId": params.userId,
                    "roleId": payload.roleId
                },
                defaults: {
                    "userId": params.userId,
                    "roleId": payload.roleId
                }
            })
            .then(res => {
                return { success: true, data: res[0] };
            })
            .catch(err => {
                console.error(err);
                return { success: false, error: err };
            });
        }
    },
    ReadAllRoles: async (request, h) => {
        return db.roles.findAll({ attributes: ['id', 'name'] })
            .then(res => res)
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            })
            .then(res => {
                return { success: true, data: res };
            });
    },
    GetRoles: async (request, h) => {
        let params = request.params;
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("officer", _decoded) || Lib.RequireRole(`user:${_decoded.data.id}`, _decoded)) {
            return db.user_roles.findAll({
                where: {
                    userId: params.userId
                }
            })
                .then(res => {
                    if (res != null) {
                        var tmp = [];
                        res.forEach(r => {
                            tmp.push(db.roles.findByPk(r.roleId, { attributes: ['name'] }).then(res2 => res2).catch(err2 => err2));
                        });
                    }
                    return Promise.all(tmp).then(r => r);
                })
                .catch((err) => {
                    console.error(err);
                    return { success: false, error: err };
                })
                .then(res => {
                    return { success: true, data: res };
                });
        }
    },
    DeleteRole: async (request, h) => {
        let payload = request.payload;
        let params = request.params;
        var _decoded = Lib.ParseToken(request.headers.authorization);

        if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("officer", _decoded)) {
            return db.user_roles.destroy({
                where: {
                    "userId": params.userId,
                    "roleId": payload.roleId
                }
            })
            .then(res => {
                if (res == 1) {
                    return { success: true, message: `Removed role ${payload.roleId} from user ${params.userId}` };
                }
                else {
                    return { success: false, message: `User ${params.userId} did not have role ${payload.roleId}` };
                }
            })
            .catch(err => {
                console.error(err);
                return { success: false, error: err };
            });
        }
    }
};