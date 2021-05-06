const get = require("../../../../../server/endpoint/rest/get");
const testError = require("../../testError");

module.exports = get(async (req, res) => {
    return await testError();
});
