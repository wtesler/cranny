const rest = require("./rest");

/**
 * Turns the provided handler function into an HTTPS REST POST function.
 *
 * This handles the body parsing for you. If the body is already parsed, use `simplePost` instead.
 *
 * @param handler A function which takes (req, res).
 */
module.exports = function (handler) {
  return rest('POST', async (req, res) => {
    return new Promise((resolve, reject) => {
      const run = async() => {
        try {
          const response = await handler(req, res);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      }

      if (req.body) {
        run();
      } else {
        const buffers = [];
        let length = 0;

        req.on("data", chunk => {
          buffers.push(chunk);
          length += chunk.length;
        });

        req.on("end", async () => {
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

          run();
        });
      }
    });
  });
};
