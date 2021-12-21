const rest = require('./endpoint/rest/rest');
const endpoint = require('./endpoint/endpoint');
const accessError = require('./errors/accessError');
const parameterError = require('./errors/parameterError');
const discoverEndpoints = require('./host/discoverEndpoints');

module.exports = {
  rest: rest,
  endpoint: endpoint,
  accessError: accessError,
  parameterError: parameterError,
  discoverEndpoints: discoverEndpoints
}
