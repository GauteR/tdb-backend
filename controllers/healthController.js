/*jshint esversion: 8 */
const Pack = require("../package");

module.exports = {
    HealthCheck: async (request, h) => {
        return {success: true, version: Pack.version, name: Pack.name, timestamp: new Date().toISOString()}
    }
};