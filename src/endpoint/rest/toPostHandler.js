module.exports = async function (handler, req, res) {
  return new Promise(async(resolve, reject) => {
    const run = async () => {
      try {
        const response = await handler(req, res);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    }

    if (req.body) {
      await run();
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

        await run();
      });
    }
  });
}
