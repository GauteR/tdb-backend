/*jshint esversion: 8 */
const iq = require("inspirational-quotes");

module.exports = {
    GetQuote: async (request, h) => {
        return iq.getRandomQuote();
    }
};