module.exports = (req=null, isMissing=true) => {
  const problem = isMissing ? 'Missing' : 'Malformed';

  if (req) {
    console.warn(`${problem} parameters in the following body`);
    console.warn(req.body);
  }

  const e = new Error();
  e.code = 422;
  e.message = `Some parameters are ${problem.toLowerCase()}.`;
  throw e;
};
