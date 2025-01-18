class ApiError extends Error {
  constructor(
    statusCode,
    massage = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super(massage);
    this.statusCode = statusCode;
    this.massage = massage;
    this.error = error;
    this.success = false;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export {ApiError}