const get = require("../../../../../server/endpoint/rest/get");
const testSuccess = require("../../testSuccess");

module.exports = get(async (req, res) => {
    return await testSuccess();
});
