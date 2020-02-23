/*jshint esversion: 8 */

module.exports = {
  Authenticate: async (_username) => {
    const db = require("../models/index");
    if (!_username) return { success: false, error: "Username missing" };
    return await db.users.findOne({
      where: {
        "username": _username
      }
    })
      .then(user => {
        if (user == null) {
          return { success: false, error: "Wrong username" };
        }
        else {
          return db.user_roles.findAll({
            where: {
              userId: user.id
            },
            attributes: ['roleId']
          })
            .then((res_p) => {
              var roles = [];
              res_p.forEach(p => {
                roles.push(db.roles.findOne({
                  where: {
                    id: p.roleId
                  },
                  attributes: ['name']
                })
                  .then((res_r) => {
                    return res_r.name;
                  }));
              });
              return Promise.all(roles).then(res => res);
            })
            .catch((err_p) => {
              console.error(err_p);
              return { success: false, error: err_p };
            })
            .then(res => {
              return { success: true, data: { id: user.id, username: user.username, password: user.password, roles: res } }
            });
        }
      })
      .catch((err) => {
        console.error(err);
        return { success: false, error: err };
      });
  }
};