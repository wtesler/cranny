/**
 * Get all endpoints in the root dir.
 * Any file which ends in `.post.js` or '.get.js is a hosted endpoint.
 *
 * @param rootDir Top-level directory which includes the hosted endpoint files.
 * @param types The file suffixes to look for.
 */
module.exports = function (rootDir, types=['post', 'get']) {
  const getEndpointsForType = require("./getEndpointsForType");

  const endpointsPerType = [];
  for (const type of types) {
    const endpoints = getEndpointsForType(type, rootDir);
    endpointsPerType.push(endpoints);
  }

  const endpoints = endpointsPerType.flat();

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

  for (let i = 0; i < types.length; i++){
    const type = types[i];
    console.log(`Total ${endpointsPerType[i].length} ${type} endpoints.`);
  }

  console.log(`Total ${endpoints.length} endpoints.`);

  console.log();

  return endpoints;
};
