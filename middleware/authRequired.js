const { errorResponse } = require("../controllers/responses");

module.exports = (req, res, next) => {
  console.log(req.session);
  if (!req.session.currentUser)
    return errorResponse(res, {
      status: 401,
      message: "Unauthorized. Please login and try again."
    });
  next();
};
