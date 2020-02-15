/*jshint esversion: 8 */
const Handler = require("../controllers/funnyController")

module.exports = {
  GetQuote: {
    auth: false,
    handler: Handler.GetQuote,
    description: "Generates a random inspirational quote",
    tags: ["api"]
  },
};