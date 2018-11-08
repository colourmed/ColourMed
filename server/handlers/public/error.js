function errorHandler(error, req, res, next) {
  return res.status(error.status || 500).json({
    error: {
      message:
        error.message ||
        'Something went wrong on the server. Please try again later or inform an admin.'
    }
  });
}

module.exports = errorHandler;
