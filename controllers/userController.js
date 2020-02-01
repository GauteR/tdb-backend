/*jshint esversion: 8 */

const db = require("../models/index");

module.exports = {
    CreateUser: async (request, h) => {
        let payload = request.payload;

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
    },
    ReadUser: async (request, h) => {
        return await db.users.findByPk(request.params.userId)
            .then(user => {
              if(user != null) {
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
    },
    SearchUser: async (_username) => {
        return await db.user.findOne({
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
    },
    ReadAllUsers: async (request, h) => {
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
    },
    UpdateUser: async (request, h) => {
        let payload = request.payload;
        let params = request.params;
    
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
    },
    DeleteUser: async (request, h) => {
        return await db.users.destroy({
          where: {
            id: request.params.userId
          }
        })
          .then((res) => {
            if(res == 1) {
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
};
