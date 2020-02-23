/*jshint esversion: 8 */
const Db = require("../helpers/databaseHelper");
const Auth = require("../helpers/authenticationHelper");

module.exports = {
    Authenticate: async (request, h) => {
        let response = h.response({
            success: false,
            message: "Authorization failed."
        });

        // Check if consumer exists
        return await Db.Authenticate(request.payload.username).then(user => {
            if(user.success) {
                // Is password correct?
                if (Auth.Compare(request.payload.password, user.data.password)) {
                    let signedJwt = Auth.GenerateToken(request, user.data);
                    response = h.response(signedJwt);
                    response.statusCode = 200;
                    console.info(` [ COMPLETE: Authenticate ] Successful login for user ${request.payload.username}`);
                    return response;
                }
                else {
                    response = h.response(user.data);
                    response.statusCode = 403;
                    console.warn(` [ ERROR: Authenticate ] ${JSON.stringify(user.data)}`);
                    return { success: false, message: "Wrong password" };
                }
            }
            else {
                return user;
            }
        })
            .catch(err => {
                console.error(err);
                return { success: false, error: err };
            })
            .then(result => result);
    }
};