module.exports = async function (handler, req, res, signal) {
  return new Promise(async(resolve, reject) => {
    const run = async () => {
      try {
        const response = await handler(req, res, signal);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    }

    if (req.body) {
      if (Buffer.isBuffer(req.body)) {
        onBufferFinished(req, req.body);
      } else if (!req.rawBody) {
        req.rawBody = req.body.toString();
      }
      await run();
    } else {
      const buffers = [];
      let length = 0;

      req.on('data', chunk => {
        buffers.push(chunk);
        length += chunk.length;
      });

      req.on('end', async () => {
        const buffer = Buffer.concat(buffers, length);
        onBufferFinished(req, buffer);
        await run();
      });
    }
  });
}

function onBufferFinished(req, buffer) {
  req.body = buffer.toString();
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
    req.rawBody = '';
  }
}
