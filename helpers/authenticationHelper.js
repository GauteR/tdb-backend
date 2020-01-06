/* jshint esversion: 8 */

const JWT = require("jsonwebtoken"); // used to sign our content
const Db = require("./databaseHelper");

module.exports = {
  Validate: async (decoded, request, callback) => {
    // do your checks to see if the person is valid
    var now = Math.floor(new Date().getTime() / 1000);

    // Check if consumer exists
    return await Db.Login(request.payload.username, request.payload.password).then(user => {
      // Is token expired?
      if (decoded.nbf < now && decoded.exp > now) {
        return { isValid: true };
      }
    })
      .catch(err => {
        console.error(err);
        return { isValid: false };
      })
      .then(result => result);
  },
  GenerateToken: (req) => {
    return JWT.sign({
      exp: Math.floor(Date.now() / 1000) + 15 * 60, // int
      nbf: Math.floor(Date.now() / 1000) - 10, // int
    }, process.env.JWT_SECRET);
  },
};