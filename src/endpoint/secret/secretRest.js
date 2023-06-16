/**
 * Turns the provided handler function into a secret HTTPS REST function.
 * The function is private-key protected by a shared secret.
 *
 * @param handler A function which takes (req, res).
 * @param secret The secret to compare the passed-in secret with.
 */
module.exports = function(handler, secret) {
  const rest = require('../rest/rest');

  return rest(async (req, res) => {
    const authorization = req.get('Authorization');

    if (!authorization || authorization !== secret) {
      const error = new Error('Access Denied.');
      error.code = 403;
      throw error;
    }

    return await handler(req, res);
  });
};
