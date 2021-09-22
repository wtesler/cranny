const endpoint = require("../endpoint");
const toPostHandler = require("./toPostHandler");

/**
 * Turns the provided handler function into an HTTPS REST function.
 *
 * @param handler A function which takes (req, res).
 */
module.exports = function (handler) {
  return endpoint((req, res) => {
    if (req.method === 'GET') {
      req.body = req.query; // Normalize
      return handler(req, res);
    } else if (req.method === 'POST') {
      return toPostHandler(handler, req, res);
    } else {
      const error = new Error(`Unexpected request method: ${req.method}`);
      error.code = 405;
      throw error;
    }
  });
};
