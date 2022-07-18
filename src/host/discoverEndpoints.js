/**
 * Looks throughout the project for files which end in .rest.js.
 * Those files are endpoints.
 * Return the information about the endpoints.
 * @param serverRootDir
 * @param suffix, the type of files to look for.
 * @return endpoint objects.
 */
module.exports = function (serverRootDir, suffix = 'rest') {
  let ourDir = __dirname;

  serverRootDir = serverRootDir.replace(/\\/g, '/'); // Normalize
  ourDir = ourDir.replace(/\\/g, '/'); // Normalize

  const prefix = _getPathFromHereToEndpoint(serverRootDir, ourDir);

  const suffixEnd = `.${suffix}.js`;

  const rawFiles = _getAllFiles(serverRootDir, suffixEnd);

  const endpointNames = [];

  const files = [];
  for (let i = 0; i < rawFiles.length; i++) {
    let file = rawFiles[i].slice(serverRootDir.length + 1, rawFiles[i].length);
    file = prefix + file;
    files.push(file);
  }

  for (let i = 0; i < files.length; i++) {
    let removedSuffix = files[i].slice(0, -suffixEnd.length);
    let splitPath = removedSuffix.split("/");
    let endpointName = splitPath[splitPath.length - 1];
    endpointNames.push(endpointName);
  }

  const endpoints = [];

  for (let i = 0; i < files.length; i++) {
    const endpointName = endpointNames[i];
    const file = files[i];

    let type;
    let obj;
    try {
      const requireResponse = require(file);
      if (Array.isArray(requireResponse)) {
        [type, obj] = requireResponse;
      } else {
        type = null;
        obj = requireResponse;
      }
    } catch (e) {
      throw new Error(`Problem with ${file}: ${e}`);
    }

    const endpointRoute = '/' + endpointName;

    endpoints.push({
      type: type,
      route: endpointRoute,
      obj: obj
    });
  }

  // Ensure no duplicate routes
  const routes = endpoints.map(x => x.route);
  if (routes.length !== new Set(routes).size) {
    throw new Error(`Duplicate routes found. Here are routes: ${routes}`);
  }

  // Sort endpoints by route name.
  endpoints.sort((a, b) => {
    if (a.route < b.route) {
      return -1;
    }
    if (a.route > b.route) {
      return 1;
    }
    return 0;
  });

  return endpoints;
};

function _getAllFiles(dirPath, suffix, arrayOfFiles = []) {
  const fs = require("fs");

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    if (file.includes("node_modules")) {
      return;
    }
    const filePath = dirPath + "/" + file;
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = _getAllFiles(filePath, suffix, arrayOfFiles)
    } else {
      if (!file.endsWith(suffix)) {
        return;
      }
      arrayOfFiles.push(filePath)
    }
  });

  return arrayOfFiles
}

function _getPathFromHereToEndpoint(serverRootDir, ourDir) {
  const commonPrefix = _longestCommonPrefix([serverRootDir, ourDir]);

  const ourPath = ourDir.replace(commonPrefix, '');
  const ourPathParts = ourPath.split('/').filter(part => part);

  let upDirString = '';
  for (const part of ourPathParts) {
    upDirString += '../';
  }

  let serverPath = serverRootDir.replace(commonPrefix, '');
  if (serverPath) {
    serverPath += '/';
  }

  return upDirString + serverPath;
}

function _longestCommonPrefix(strs) {
  let prefix = ""
  if (strs === null || strs.length === 0) return prefix

  for (let i = 0; i < strs[0].length; i++) {

    const char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== char) {
        return prefix;
      }
    }
    prefix = prefix + char
  }

  return prefix
}
