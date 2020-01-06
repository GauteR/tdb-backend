/* jshint esversion: 8 */

//const Lib = require("../helpers/generalHelper");
const Consumers = require("./consumers");
const JWT = require("jsonwebtoken"); // used to sign our content
const Db = require("./databaseHelper");

module.exports = {
  Validate: async (decoded, request, callback) => {
    let isValid = false;
    // do your checks to see if the person is valid
    var now = Math.floor(new Date().getTime() / 1000);
    console.info(` [ Validate ] The user named ${decoded.user_name} is a ${decoded.user_type}`);

    // Check if consumer exists
    // TODO Set up database
    /*return await Db.Login(request).then(consumer => {
        if (`${consumer.typeName}/${consumer.niceName}` == `${decoded.user_type}/${decoded.user_name}`) {
            // Is token expired?
            if (decoded.nbf < now && decoded.exp > now) {
                console.info(` [ Validate ] The consumer named ${decoded.user_name} is authenticated`);
                return { isValid: true };
            }
        }

    })
    .catch(err => {
        console.error(err);
        return { isValid: false };
    })
    .then(result => result);*/
    return { isValid: true };
  },
  GenerateToken: (req) => {
    return JWT.sign({
      exp: Math.floor(Date.now() / 1000) + 15 * 60, // int
      nbf: Math.floor(Date.now() / 1000) - 10, // int
    }, process.env.JWT_SECRET);
  },
};