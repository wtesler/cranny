const rest = require("./rest");

/**
 * Turns the provided handler function into an HTTPS REST GET function.
 *
 * @param handler A function which takes (req, res).
 */
module.exports = function (handler) {
  return rest('GET', handler);
};
