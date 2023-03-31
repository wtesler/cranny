module.exports = (req=null) => {
  if (req) {
    console.warn("Missing or malformed parameters in the following body");
    console.warn(req.body);
  }

  const e = new Error();
  e.code = 422;
  e.message = "Some parameters are missing or malformed.";
  throw e;
};
