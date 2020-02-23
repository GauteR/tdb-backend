/*jshint esversion: 8 */
const JWT = require('jsonwebtoken');

module.exports = {
    ParseToken: (token) => {
        if (token == undefined || token.length == 0) {
            console.error("ERROR: ParseToken failed: No token supplied");
            return { success: false, error: { name: "ParseToken", message: "No token" } };
        }
        try {
            var decoded = JWT.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
            return { success: true, data: decoded };
        }
        catch (ex) {
            return { success: false, error: ex };
        }
    },
    RequireRole: (role, decoded) => (decoded.data.user_role.includes(role)),
    IsOwnUserProfile: (username, decoded) => (typeof(username) == "string" ? (decoded.data.user_name == username) : (decoded.data.id == username))
};