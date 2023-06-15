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
    const authorization = req.header.Authorization;

    if (!authorization || authorization !== secret) {
      res.status(403).send({ code: 403, message: 'Access Denied.' });
      return Promise.resolve();
    }

    return await handler(req, res);
  });
};
