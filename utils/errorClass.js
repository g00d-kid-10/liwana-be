class CustomError extends Error {
    constructor(message) {
      super(message);
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';
  
    constructor() {
      super(reason);
      Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
  
    serializeErrors() {
      return [{ message: this.reason }];
    }
  }
  class InternalServerError extends CustomError {
    statusCode = 500;
    reason = 'Internal Server Error';
  
    constructor(message) {
      super(reason);
      Object.setPrototypeOf(this, InternalServerError.prototype);
    }
  
    serializeErrors() {
      return [{ message: this.message }];
    }
  }
  
  class RequestValidationError extends CustomError {
    statusCode = 400;
    errors = [];
    constructor(err) {
      super('Invalid request parameters');
  
      if (typeof err === 'string') {
        this.errors = [{ msg: err }];
      } else {
        this.errors = err.errors;
      }
  
      // Only because we are extending a built in class
      Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
  
    serializeErrors() {
      return this.errors.map((err) => {
        if (err.type === 'field') {
          return { message: err.msg, field: err.path };
        }
        return { message: err.msg };
      });
    }
  }
  
  class NotFoundError extends CustomError {
    statusCode = 404;
  
    constructor(message) {
      super(message);
  
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  
    serializeErrors() {
      return [{ message: this.message }];
    }
  }
  
  module.exports = {
    CustomError,
    DatabaseConnectionError,
    InternalServerError,
    RequestValidationError,
    NotFoundError
  };
  