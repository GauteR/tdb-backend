/*jshint esversion: 8 */

const db = require("../models/index");
const Lib = require("../helpers/generalHelper");
const { Op } = require("sequelize");

module.exports = {
  CreateRaid: async (request, h) => {
    let payload = request.payload;
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("raid_leader", _decoded)) {
      var userId = _decoded.data.id;
      return await db.raids.create(
        {
          userId: userId,
          name: payload.name,
          desc: payload.desc,
          diff: payload.diff,
          planned: payload.planned,
          minTanks: payload.minTanks,
          minHealers: payload.minHealers,
          minMelee: payload.minMelee,
          minRanged: payload.minRanged,
          recGear: payload.recGear,
          announce: payload.announce
        }
      )
        .then((raid) => {
          return { success: true, data: raid };
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
  ReadRaid: async (request, h) => {
    return await db.raids.findByPk(request.params.raidId)
      .then(raid => {
        if (raid != null) {
          return { success: true, data: raid };
        }
        else {
          return { success: false, message: "Could not find raid" };
        }
      })
      .catch((err) => {
        console.error(err);
        return { success: false, error: err };
      });
  },
  SearchRaid: async (_name) => {
    return await db.raids.findOne({
      where: { "name": _name }
    })
      .then(raid => {
        if (raid != null) {
          return { success: true, data: raid };
        }
        else {
          return { success: false, error: "Could not find raid" };
        }
      })
      .catch((err) => {
        console.error(err);
        return { success: false, error: err };
      });
  },
  ReadAllRaids: async (request, h) => {
    return await db.raids.findAll()
      .then(raids => {
        return { success: true, data: raids };
      })
      .catch((err) => {
        console.error(err);
        return { success: false, error: err };
      });
  },
  UpdateRaid: async (request, h) => {
    let payload = request.payload;
    let params = request.params;
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("raid_leader", _decoded)) {
      let updateFields = ["userId"];
      if (payload.name) updateFields.push('name');
      if (payload.desc) updateFields.push('desc');
      if (payload.diff) updateFields.push('diff');
      if (payload.planned) updateFields.push('planned');
      if (payload.minTanks) updateFields.push('minTanks');
      if (payload.minHealers) updateFields.push('minHealers');
      if (payload.minMelee) updateFields.push('minMelee');
      if (payload.minRanged) updateFields.push('minRanged');
      if (payload.recGear) updateFields.push('recGear');
      if (payload.announce) updateFields.push('announce');

      let promises = [
        db.raids.update({
          userId: _decoded.data.id,
          name: payload.name,
          desc: payload.desc,
          diff: payload.diff,
          planned: payload.planned,
          minTanks: payload.minTanks,
          minHealers: payload.minHealers,
          minMelee: payload.minMelee,
          minRanged: payload.minRanged,
          recGear: payload.recGear,
          announce: payload.announce
        }, {
          where: { id: params.raidId },
          fields: updateFields
        }).catch((err) => console.error(err))
      ];

      return Promise.all(promises).catch(err => ({ success: false, error: err })).then(values => ({ success: true, data: values }));
    }
    else {
      return { success: false, error: "Unauthorized" }
    }
  },
  DeleteRaid: async (request, h) => {
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("raid_leader", _decoded)) {
      return await db.raids.destroy({
        where: {
          id: request.params.raidId
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
  },
  GenerateInvites: async(request, h) => {
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("raid_leader", _decoded) || Lib.RequireRole("raid_assist", _decoded)) {
      return db.raid_signup.findAll({
        where: {
          "raidId": request.params.raidId
        },
        include: [
          {
            model: db.raids
          },
          {
            model: db.characters,
            where: {
              [Op.not]: [
                { "userId": _decoded.data.id }
              ]
            },
            order: [
              [ db.characters, 'realm', 'ASC' ],
              [ db.characters, 'name', 'ASC' ]
            ]
          },
          {
            model: db.status,  
            where: {
              [Op.or]: [
                { name: "Raid leader" },
                { name: "Raid assist" },
                { name: "Drafted" }
              ]
            }
          }
        ]
      })
      .then(signups => {
        console.log(signups);
        var inv_script = "";
        signups.forEach(element => {
          inv_script += `/inv ${element.character.name}-${element.character.realm}\n`;
        });
        return inv_script;
      })
      .catch(err => {
        console.error(err);
        return { success: false, error: err };
      });
    }
    else {
      return { success: false, error: "Unauthorized" }
    }
  }
};
