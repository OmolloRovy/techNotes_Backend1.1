// middleware/asyncHandler.js
module.exports = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error(error);
    next(error);
  });
};
