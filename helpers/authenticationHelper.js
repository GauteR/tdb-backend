/* jshint esversion: 8 */

const JWT = require("jsonwebtoken"); // used to sign our content
const Db = require("./databaseHelper");
const bcrypt = require('bcryptjs'), saltRounds = 10;

module.exports = {
  Validate: async (decoded, request, callback) => {
    var now = Math.floor(new Date().getTime() / 1000);
    
    // Check if user exists
    return await Db.Authenticate(decoded.user_name).then(user => {
      if(user.success) {
        var userdata = user.data;
        // Is password correct?
        if (userdata.password === decoded.user_hash) {
          // Is token expired?
          if (decoded.nbf < now && decoded.exp > now) {
            return { isValid: true };
          }
          else {
            return { isValid: false };
          }
        }
        else {
          return { isValid: false };
        }
      }
      else {
        return { isValid: false };
      }
    })
      .catch(err => {
        console.error(err);
        return { isValid: false };
      })
      .then(result => result);
  },
  GenerateToken: (req, user) => {
    return JWT.sign({
      id: user.id,
      user_name: user.username,
      user_role: user.roles,
      user_hash: user.password, // TODO Very insecure: remove this when we implement refresh tokens
      exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // Expires: in 30 days
      nbf: Math.floor(Date.now() / 1000) - 10, // Not before: 10 seconds in the past
    }, process.env.JWT_SECRET);
  },
  Encrypt: (decrypted) => {
    return bcrypt.hashSync(decrypted, bcrypt.genSaltSync(saltRounds));
  },
  Compare: (inputString, hashed) => {
    if (inputString != undefined || inputString != null) {
      return bcrypt.compareSync(inputString, hashed);
    }
    else {
      return false;
    }
  }
};