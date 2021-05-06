const testError = require("../testError");

(async () => {
  try {
    await testError();
  } catch (e) {
    console.log("Failed as expected");
  }
})();
