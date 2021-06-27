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
//   app[endpoint.type](endpoint.route, endpoint.obj);
// }
//
// const PORT = process.env.PORT || 8085;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}...`);
// });
