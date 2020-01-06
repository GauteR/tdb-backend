/*jshint esversion: 8 */

var Health = require("./configurations/healthConfig");

module.exports = [
  {
    method: "GET",
    path: "/health",
    config: Health.getHealth
  },
];