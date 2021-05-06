/**
 * Report the server error.
 */
module.exports = function(e) {
  console.error(e);
  if (e.code === 500) {
    report(e); // We only report server errors.
  }
};

function report(e) {
  if (process.env.NODE_ENV === "development") {
    console.warn("Would have reported error but in development.");
  } else {
    console.log("Reporting error...");

    // const { ErrorReporting } = require("@google-cloud/error-reporting");
    //
    // const errorReporting = new ErrorReporting({
    //   serviceContext: {
    //     service: "default"
    //   },
    //   reportMode: 'always',
    //   logLevel: 5
    // });
    //
    // errorReporting.report(e);
  }
}
