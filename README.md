## cranny

A Node.js server architecture with a focus on 
isolation, segmentation, and safe request handling.

### Base Endpoints

`endpoint.js` is the base of each endpoint.
It handles the sending of the response including any errors which were thrown.

Endpoint functionality is constructed through higher-order functions.

`rest.js` is an example of a higher-order function derived from `endpoint.js` 
that handles specific RESTful aspects of the corresponding call.

### Endpoint creation

The files which represent endpoints should either export an array which may look like:

```
const {rest} = require('cranny');
module.exports = [
  'post', // type
  rest(async (req, res, signal) => {
    const someFunction = require('../someFunction');
    return await someFunction(); // Returns an object or null.
  })
];
```

or just a function like this:

```
const {rest} = require('cranny');
module.exports = rest(async (req, res, signal) => {
  const someFunction = require('../someFunction');
  return await someFunction(req); // Returns an object or null.
});
```

### Hosting endpoints
After initializing your server (let's say an express server),
call `discoverEndpoints` to collect all hostable endpoints from a given root.
You may then host the endpoints like this:

```
const express = require('express');
const {discoverEndpoints, rest} = require('cranny');

const app = express();
app.use(express.raw({ type: 'application/json', limit: '10mb' }));
app.use(cors());

const endpoints = discoverEndpoints(__dirname);

for (const endpoint of endpoints) {
    const type = endpoint.type;
    const name = endpoint.name;
    const func = endpoint.obj;
    app[type](`/${name}`, func);
}
```

or for Firebase cloud functions for example:

```
const functions = require('firebase-functions');
const {discoverEndpoints, rest} = require('cranny');

const restEndpoints = discoverEndpoints(__dirname);

for (const endpoint of restEndpoints) {
    const name = endpoint.name;
    const func = endpoint.obj;
    exports[name] = functions.region('us-central1').https.onRequest(async (req, res) => {
      cors(req, res, async () => {
        await rest(func(req, res));
      });
    });
}
```

Each endpoint has 3 properties:

`type`: The type of the endpoint (like 'get' or 'post'). May be excluded/null.

`name`: The name of the endpoint

`obj`: The obj representing the required file. Often times is a function with the `req`, `res`, and optional `signal` parameters.


### Signal parameter

You endpoints can take advantage of the abort signal which is passed in next to `req`, and `res`.
The abort signal will fire when the user ends the connection prematurely. It can act as an interrupt.


### Naming Convention
The `discoverEndpoints` call looks for files which have a special suffix `.rest.js`.

You may also pass in your own suffixes to the call to get different endpoints.

Every file which you want to represent as an endpoint should 
have a unique name.

### Benefits of architecture
Don't ever need to handle the sending of responses yourself.

Don't need to handle the sending of error responses in case of error.

No monotonically increasing `index.js` file.

Endpoints can be created in isolation and never need to touch core code.

Higher-order functions abstract away most of the network layer.

### Foolproof Error Handling
Wherever you setup your environment, you can set this global variable:

`global.crannyReportError = (e) => { ... }`

This is the global fallback that ensures that any unexpected error in the request
is handled/reported properly.

### Publish
Published with `npm publish`
