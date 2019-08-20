const db = require("../models");
const { successResponse, errorResponse } = require("./responses");

module.exports = {
  show: (req, res) => {
    db.User.findById(req.params.id, { password: 0, __v: 0, _id: 0 }).exec(
      (err, foundUser) => {
        if (err)
          return errorResponse(res, {
            status: 500,
            message: "Something went wrong. Please try again."
          });

        return successResponse(res, { status: 200, data: { user: foundUser } });
      }
    );
  },
  index: (req, res) => {
    db.User.find({}, { password: 0, __v: 0, _id: 0 }).exec((err, allUsers) => {
      if (err)
        return errorResponse(res, {
          status: 500,
          message: "Something went wrong. Please try again."
        });

      return successResponse(res, { status: 200, data: allUsers });
    });
  }
};
