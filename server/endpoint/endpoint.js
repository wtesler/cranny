const reportError = require("../errors/reportError");

/**
 * Handles the sending of the response. Handles errors. Handles status code.
 *
 * @param handler A function which takes (req, res).
 */
module.exports = function (handler) {
  return async(req, res) => {
    let responseContent;
    let statusCode;
    try {
      responseContent = await handler(req, res);
      responseContent = responseContent ? responseContent : {};
      statusCode = 200;
    } catch (e) {
      if (!e.code) {
        e.code = 500; // Default to 500 if no specific code given.
      }
      statusCode = e.code;
      responseContent = { message: e.message, code: statusCode };
      reportError(e);
    }

    // Is it a plain object? (i.e. not a buffer, array, string etc...)
    if (Object.prototype.toString.call(responseContent) === '[object Object]') {
      // Since this case is so common, we handle it here.
      // If a endpoint wants to return another type, they have to set the header themselves.
      responseContent.code = statusCode;
      res.setHeader('Content-Type', 'application/json');
      responseContent = JSON.stringify(responseContent);
    }

    res.status(statusCode).end(responseContent);
  };
};
