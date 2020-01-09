/*jshint esversion: 8 */

const db = require("../models/index");

module.exports = {
  ExecuteQuery: async (sql) => {
    return await db.sequelize.query(sql).then(res => {
      return { success: true, data: res };
    }).catch(err => {
      return { success: false, error: err };
    });
  },
  Login: async(username, password) => {
    
  }
};