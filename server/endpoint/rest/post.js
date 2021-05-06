const rest = require("./rest");

/**
 * Turns the provided handler function into an HTTPS REST POST function.
 *
 * @param handler A function which takes (req, res).
 */
module.exports = function (handler) {
  return rest('POST', async(req, res) => {

    const buffers = [];
    let length = 0;

    req.on("data", chunk => {
      buffers.push(chunk);
      length += chunk.length;
    });

    req.on("end", () => {
      req.body = Buffer.concat(buffers, length).toString();
      if (req.body) {
        req.rawBody = req.body;
        try {
          // Since this case is so common, we try to handle it here.
          req.body = JSON.parse(req.body);
        } catch (e) {
          // Everything is fine, we're just not dealing with a JSON body.
        }
      } else {
        req.body = {};
      }
      return handler(req, res);
    });
  });
};
