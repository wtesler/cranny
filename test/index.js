// const express = require('express');
// const cors = require("cors");
const getEndpoints = require("../server/host/getEndpoints");

// const app = express();
//
// app.use(cors());
//
// app.get('/', (req, res) => {
//   res.send('Server Running...');
// });

const endpoints = getEndpoints(__dirname);

console.log(endpoints);

// for (const endpoint of endpoints) {
//   app[endpoint.type](endpoint.route, endpoint.func);
// }
//
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}...`);
// });
