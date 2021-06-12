const errorMiddleware = (error, req, res, next) => {

  console.log("ERROR!!", error)
  res.status(error.status).send({
    OK: 0,
    message: error.message,
  });
};

module.exports = errorMiddleware;
