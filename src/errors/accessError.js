module.exports = () => {
  const e = new Error();
  e.code = 403;
  e.message = "Access Denied.";
  throw e;
};
