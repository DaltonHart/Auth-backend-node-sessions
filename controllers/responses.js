module.exports = {
  errorResponse: (res, { status, message }, errors) => {
    return res.status(status).json({
      status,
      message,
      errors: errors
    });
  },
  successResponse: (res, { status, message, data }) => {
    return res.status(status).json({
      status,
      message,
      data
    });
  }
};
