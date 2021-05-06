const endpoint = require("../endpoint");

/**
 * Turns the provided handler function into an HTTPS REST function.
 *
 * @param type Like 'GET' or 'POST' etc...
 * @param handler A function which takes (req, res).
 */
module.exports = function (type, handler) {
  return endpoint((req, res) => {
    if (req.method !== type) {
      const error = new Error(`Expecting ${type} request.`);
      error.code = 405;
      throw error;
    }

    return handler(req, res);
  });
};
