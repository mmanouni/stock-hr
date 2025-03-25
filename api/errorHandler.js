function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      details: err.details || 'An unexpected error occurred',
    },
  });
}

module.exports = errorHandler;
