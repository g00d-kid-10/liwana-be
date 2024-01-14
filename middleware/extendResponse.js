const extendResponse = (req, res, next) => {
  res.formatResponse = function (statusCode = 500, success = false, message = '', data = null, errors = []) {
    const response = {
      statusCode,
      success: success,
      message: message,
      data: data,
      errors: errors,
    };
    res.status(statusCode).json(response);
  };
  next();
};

module.exports = extendResponse;
