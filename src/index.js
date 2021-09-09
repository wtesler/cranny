const get = require('./endpoint/rest/get');
const post = require('./endpoint/rest/post');
const rest = require('./endpoint/rest/rest');
const endpoint = require('./endpoint/endpoint');
const accessError = require('./errors/accessError');
const parameterError = require('./errors/parameterError');
const getEndpoints = require('./host/getEndpoints');
const getEndpointsForType = require('./host/getEndpointsForType');

module.exports = {
  get: get,
  post: post,
  rest: rest,
  endpoint: endpoint,
  accessError: accessError,
  parameterError: parameterError,
  getEndpoints: getEndpoints,
  getEndpointsForType: getEndpointsForType,
}
