const testSuccess = require("../testSuccess");

(async () => {
  const response = await testSuccess();
  console.log(response);
})();
