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
      responseContent = { message: e.message };
      statusCode = e.code;
      if (!statusCode) {
        statusCode = 500;
      } else if (isNaN(statusCode)) {
        responseContent.message = `${statusCode}: ${responseContent.message}`;
        statusCode = 500;
      }
      // This is a global function (if the consumer set it).
      if (crannyReportError) {
        crannyReportError(e);
      }
    }

    // Is it a plain object? (i.e. not a buffer, array, string etc...)
    if (Object.prototype.toString.call(responseContent) === '[object Object]') {
      // Since this case is so common, we handle it here.
      // If a endpoint wants to return another type, they have to set
      // the header themselves.
      responseContent.code = statusCode;
      res.setHeader("Content-Type", "application/json");
      responseContent = JSON.stringify(responseContent);
    }

    res.status(statusCode).end(responseContent);
  };
};
