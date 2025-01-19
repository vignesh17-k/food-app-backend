const CONSTANST = require("../constants");

const errorHandler = (err, req, res, next) => {
  const status = res.statusCode || 500;

  switch (status) {
    case CONSTANST.VALIDATION_ERROR:
      res.json({
        title: "validation Request/bad request",
        status: res?.statusCode,
        message: err?.message,
      });
    default:
      res.json({
        status: res?.statusCode,
        message: err?.message,
      });
  }
};

module.exports = errorHandler;
