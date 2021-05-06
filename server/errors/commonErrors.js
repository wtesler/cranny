/**
 * Common errors which occur in hosted endpoints.
 */
module.exports = {
  parameterError: function(req=null) {
    if (req) {
      if (req.method === "POST") {
        console.log("Missing parameters in the following body");
        console.log(req.body);
        return;
      } else if (req.method === "GET") {
        console.log("Missing parameters in the following query");
        console.log(req.query);
      }
    }

    const e = new Error();
    e.code = 422;
    e.message = "Missing some parameters.";
    throw e;
  },

  accessError: function() {
    const e = new Error();
    e.code = 403;
    e.message = "Access Denied.";
    throw e;
  }
};
