module.exports = function(type, serverRootDir) {
  let ourDir = __dirname;

  serverRootDir = serverRootDir.replace(/\\/g, '/'); // Normalize
  ourDir = ourDir.replace(/\\/g, '/'); // Normalize

  const prefix = getPathFromHereToEndpoint(serverRootDir, ourDir);

  const suffix = '.' + type + '.js';

  const rawFiles = getAllFiles(serverRootDir, suffix);

  const endpointNames = [];

  const files = [];
  for (let i = 0; i < rawFiles.length; i++) {
    let file = rawFiles[i].slice(serverRootDir.length + 1, rawFiles[i].length);
    file = prefix + file;
    files.push(file);
  }

  for (let i = 0; i < files.length; i++) {
    let removedSuffix = files[i].slice(0, -suffix.length);
    let splitPath = removedSuffix.split("/");
    let endpointName = splitPath[splitPath.length - 1];
    endpointNames.push(endpointName);
  }

  const endpoints = [];

  for (let i = 0; i < files.length; i++) {
    const endpointName = endpointNames[i];
    const file = files[i];

    const obj = require(file);

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

  return endpoints;
};

function getAllFiles(dirPath, suffix, arrayOfFiles=[]) {
  const fs = require("fs");

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    if (file.includes("node_modules")) {
      return;
    }
    const filePath = dirPath + "/" + file;
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, suffix, arrayOfFiles)
    } else {
      if (!file.endsWith(suffix)) {
        return;
      }
      arrayOfFiles.push(filePath)
    }
  });

  return arrayOfFiles
}

function getPathFromHereToEndpoint(serverRootDir, ourDir) {
  const commonPrefix = longestCommonPrefix([serverRootDir, ourDir]);

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

function longestCommonPrefix(strs) {
  let prefix = ""
  if(strs === null || strs.length === 0) return prefix

  for (let i=0; i < strs[0].length; i++){
    const char = strs[0][i] // loop through all characters of the very first string.

    for (let j = 1; j < strs.length; j++){
      // loop through all other strings in the array
      if(strs[j][i] !== char) return prefix
    }
    prefix = prefix + char
  }

  return prefix
}
