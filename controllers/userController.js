/*jshint esversion: 8 */

const db = require("../models/index");
const Lib = require("../helpers/generalHelper");

module.exports = {
  CreateUser: async (request, h) => {
    let payload = request.payload;
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("user_manager", _decoded)) {

      return await db.users.findOrCreate(
        {
          where: {
            username: payload.username
          },
          defaults: {
            username: payload.username,
            password: payload.password,
            email: payload.email,
            role: payload.role
          }
        }
      )
        .then((user) => {
          delete user[0].password;
          return { success: true, data: user[0] };
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
  ReadUser: async (request, h) => {
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("user_manager", _decoded) || Lib.IsOwnUserProfile(request.params.userId, _decoded)) {
      return await db.users.findByPk(request.params.userId)
        .then(user => {
          if (user != null) {
            return { success: true, data: user };
          }
          else {
            return { success: false, message: "User does not exist" };
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
  SearchUser: async (_username) => {
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("user_manager", _decoded) || Lib.IsOwnUserProfile(_username, _decoded)) {
      return await db.users.findOne({
        where: { "username": _username }
      })
        .then(user => {
          if (user != null) {
            return { success: true, data: user };
          }
          else {
            return { success: false, error: "Could not find user" };
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
  ReadAllUsers: async (request, h) => {
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("user_manager", _decoded)) {
      return await db.users.findAll()
        .then(users => {
          var arr = [];
          users.forEach(user => {
            arr.push({ id: user.id, username: user.username });
          });
          return { success: true, data: arr };
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
  UpdateUser: async (request, h) => {
    let payload = request.payload;
    let params = request.params;
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("user_manager", _decoded) || Lib.IsOwnUserProfile(params.userId, _decoded)) {

      let updateFields = [];
      if (payload.username) updateFields.push('username');
      if (payload.password) updateFields.push('password');
      if (payload.email) updateFields.push('email');
      if (payload.role) updateFields.push('role');

      let promises = [
        db.users.update({
          username: payload.username,
          password: payload.password,
          email: payload.email,
          role: payload.role
        }, {
          where: { id: params.userId },
          fields: updateFields
        }).catch((err) => console.error(err))
      ];

      return Promise.all(promises).catch(err => ({ success: false, error: err })).then(values => ({ success: true, data: values }));
    }
    else {
      return { success: false, error: "Unauthorized" }
    }
  },
  DeleteUser: async (request, h) => {
    var _decoded = Lib.ParseToken(request.headers.authorization);

    if (Lib.RequireRole("admin", _decoded) || Lib.RequireRole("user_manager", _decoded) || Lib.IsOwnUserProfile(request.params.userId, _decoded)) {
      return await db.users.destroy({
        where: {
          id: request.params.userId
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
