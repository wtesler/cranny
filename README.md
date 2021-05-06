## cranny

A Node.js server architecture with a focus on 
isolation, segmentation, and safe request handling.

### Base Endpoints

`endpoint.js` is the base of each endpoint.
It handles the sending of the response including any errors which were thrown.

Endpoint functionality is constructed through higher-order functions.

`post.js` and `get.js` are examples of higher-order functions which are
derived from `endpoint.js` but handle specific aspects of the corresponding
RESTful call.

### Hosting endpoints
After initializing your server (let's say an express server),
call `getEndpoints` to collect all hostable endpoints from a given root.
You may then host the endpoints like this:

```
const endpoints = getEndpoints(expressApp, __dirname);

for (const endpoint of endpoints) {
  expressApp[endpoint.type](endpoint.route, endpoint.func);
}
```

Each endpoint has 3 properties:

`type`: The type of the endpoint (like 'get' or 'post')

`route`: The name of the endpoint

`func`: The function which is called with the `req` and `res` variables.


### Naming Convention
The `getEndpoints` call looks for files which have a special suffix.
That suffix is as follows:

`.get.js`: Indicates the function wants to be a GET endpoint.

`.post.js`: Indicates the function wants to be a POST endpoint.

Every file which you want to represent as an endpoint should 
have a unique name.

### Benefits of architecture
Don't ever need to handle the sending of responses yourself.

Don't need to handle the sending of error responses in case of error.

No monotonically increasing `index.js` file.

Endpoints can be created in isolation and never need to touch core code.

Higher-order functions abstract away most of the network layer.

### Samples
See test directory for a sample server setup. Notice how
`testSuccessOpen.get.js` and `testErrorOpen.get.js` are discovered
and hosted from the index file automatically.

After running the server locally, you can go to `http://localhost:8080/testSuccessOpen`
to see a sample response.
