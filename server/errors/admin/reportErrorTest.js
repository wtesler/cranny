const reportError = require("../reportError");

(async() => {
  process.env.NODE_ENV = "production";
  await reportError(new Error("Test Error"));
})();
