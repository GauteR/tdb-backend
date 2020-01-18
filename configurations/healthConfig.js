/*jshint esversion: 8 */

module.exports = {
  getHealth: {
    auth: false,
    handler: (request, h) => {
        return true;
    },
    description: "Checks health status of the API",
    notes: "Valid claims: all",
    tags: ["api"]
  },
};