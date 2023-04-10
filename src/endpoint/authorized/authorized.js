/**
 * Turns the provided handler function into an authorized function.
 * The function passes in the authorized user to the handler.
 *
 * @param handler A function which takes (req, res, user).
 * @param user The user
 */
module.exports = function(handler, user) {
  return async (req, res, signal) => {
    return await handler(req, res, user, signal);
  };
};
