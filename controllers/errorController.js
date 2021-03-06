module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log('reaching global');
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  console.log('issue global');
};
