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
          return { success: true, data: user };
        }
      })
      .catch((err) => {
        console.error(err);
        return { success: false, error: err };
      });
  }
};