/*jshint esversion: 8 */

const db = require("../models/index");
const Lib = require("../helpers/generalHelper");

module.exports = {
    CreateCharacter: async (request, h) => {
        let payload = request.payload;
        var _decoded = Lib.ParseToken(request.headers.authorization);
        var userId = _decoded.data.id;

        if (
            Lib.RequireRole("admin", _decoded) || 
            Lib.RequireRole(`member:${userId}`, _decoded)
        ) {
            return await db.characters.create(
                {
                    userId: userId,
                    specializationId: payload.specializationId,
                    raceId: payload.raceId,
                    name: payload.name,
                    realm: payload.realm,
                    armoryLink: payload.armoryLink,
                    isMain: payload.isMain
                }
            )
                .then((character) => {
                    return { success: true, data: character };
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
    ReadCharacter: async (request, h) => {
        return await db.characters.findByPk(request.params.charId, {
            include: [
                { model: db.races },
                { model: db.specializations }
            ]
        })
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
    SearchCharacter: async (_name, _realm) => {
        return await db.characters.findOne({
            where: {
                "name": _name,
                "realm": _realm
            },
            include: [
                { model: db.races },
                { model: db.specializations }
            ]
        })
            .then(character => {
                if (character != null) {
                    return { success: true, data: character };
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
    ReadAllCharacters: async (request, h) => {
        return await db.characters.findAll({
                include: [
                    { model: db.races },
                    { model: db.specializations }
                ]
            })
            .then(characters => {
                return { success: true, data: characters };
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err };
            });
    },
    UpdateCharacter: async (request, h) => {
        let payload = request.payload;
        let params = request.params;
        var _decoded = Lib.ParseToken(request.headers.authorization);
        var userId = _decoded.data.id;
    
        if (
            Lib.RequireRole("admin", _decoded) || 
            Lib.RequireRole(`member:${userId}`, _decoded)
        ) {
          let updateFields = ["userId"];
          if (payload.specializationId) updateFields.push('specializationId');
          if (payload.raceId) updateFields.push('raceId');
          if (payload.name) updateFields.push('name');
          if (payload.realm) updateFields.push('realm');
          if (payload.armoryLink) updateFields.push('armoryLink');
          if (payload.isMain) updateFields.push('isMain');
    
          let promises = [
            db.characters.update({
                userId: userId,
                specializationId: payload.specializationId,
                raceId: payload.raceId,
                name: payload.name,
                realm: payload.realm,
                armoryLink: payload.armoryLink,
                isMain: payload.isMain
            }, {
              where: { id: params.charId },
              fields: updateFields
            }).catch((err) => console.error(err))
          ];

          return Promise.all(promises).catch(err => ({ success: false, error: err })).then(values => ({ success: true, data: values }));
        }
        else {
          return { success: false, error: "Unauthorized" }
        }
    },
    DeleteCharacter: async (request, h) => {
        var _decoded = Lib.ParseToken(request.headers.authorization);
        var userId = _decoded.data.id;

        if (
            Lib.RequireRole("admin", _decoded) || 
            Lib.RequireRole(`member:${userId}`, _decoded)
        ) {
          return await db.characters.destroy({
            where: {
              id: request.params.charId
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