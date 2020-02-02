/*jshint esversion: 8 */

const db = require("../models/index");
const Lib = require("../helpers/generalHelper");

module.exports = {
  CreateRaid: async (request, h) => {
    let payload = request.payload;
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("raid_leader", _decoded)) {
      return await db.raids.create(
        {
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
      let updateFields = [];
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
  }
};
