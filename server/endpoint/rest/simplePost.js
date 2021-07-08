const rest = require("./rest");

/**
 * Turns the provided handler function into an HTTPS REST POST function.
 *
 * This one assumes the body is already parsed.
 *
 * @param handler A function which takes (req, res).
 */
module.exports = function (handler) {
  return rest('POST', handler);
};
