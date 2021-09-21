const rest = require('./endpoint/rest/rest');
const endpoint = require('./endpoint/endpoint');
const accessError = require('./errors/accessError');
const parameterError = require('./errors/parameterError');
const getEndpoints = require('./host/getEndpoints');
const getEndpointsForType = require('./host/getEndpointsForType');

module.exports = {
  rest: rest,
  endpoint: endpoint,
  accessError: accessError,
  parameterError: parameterError,
  getEndpoints: getEndpoints,
  getEndpointsForType: getEndpointsForType,
}
