const { CustomError } = require('../utils/errorClass');

const errorHandler = (err, req, res, next) => {
  // Handle the custom error
  if (err instanceof CustomError) {
    res.formatResponse(err.statusCode, false, 'Failure', null, err.serializeErrors());
  } else {
    //default  error
    res.formatResponse(500, false, 'Failure', null, ['Internal Server Error']);
  }
};

module.exports = { errorHandler };
