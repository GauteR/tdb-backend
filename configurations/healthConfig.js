/*jshint esversion: 8 */
const Handler = require("../controllers/healthController")

module.exports = {
  getHealth: {
    auth: false,
    handler: Handler.HealthCheck,
    description: "Checks health status of the API",
    tags: ["api"]
  },
};