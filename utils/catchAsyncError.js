module.exports = (handler) => {
  return (res, req, next) => {
    handler(res, req, next).catch(next);
  };
};
