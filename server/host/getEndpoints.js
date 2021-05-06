/**
 * Get all endpoints in the root dir.
 * Any file which ends in `.post.js` or '.get.js is a hosted endpoint.
 *
 * @param rootDir Top-level directory which includes the hosted endpoint files.
 */
module.exports = function (rootDir) {
  const getEndpointsForType = require("./getEndpointsForType");

  const postEndpoints = getEndpointsForType('post', rootDir);
  const getEndpoints = getEndpointsForType('get', rootDir);

  const endpoints = postEndpoints.concat(getEndpoints);
  endpoints.sort((a, b) => {
    if (a.route < b.route) {
      return -1;
    }
    if (a.route > b.route) {
      return 1;
    }
    return 0;
  });

  console.log();

  for (const endpoint of endpoints) {
    console.log(`${endpoint.route} | ${endpoint.type.toUpperCase()}`);
  }

  console.log();

  console.log(`Total ${postEndpoints.length} POST endpoints.`);
  console.log(`Total ${getEndpoints.length} GET endpoints.`);
  console.log(`Total ${endpoints.length} endpoints.`);

  console.log();

  return endpoints;
};
