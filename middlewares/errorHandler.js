exports.errorHandler = (err, req, res, next) => {
  const statusCode = 500;

  const responseBody = {
    error: true,
    message: "Internal server error",
    stack: err.stack,
  };

  console.error(err);
  res.status(statusCode).send(responseBody);
};
