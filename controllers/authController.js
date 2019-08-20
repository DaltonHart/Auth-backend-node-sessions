const bcrypt = require("bcryptjs");
const db = require("../models");
const validate = require("../validation/register");
const { errorResponse, successResponse } = require("./responses");

module.exports = {
  // POST register
  register: (req, res) => {
    const { errors, notValid } = validate(req.body);
    if (notValid)
      return errorResponse(
        res,
        {
          status: 400,
          message: "Invalid Inputs"
        },
        errors
      );

    // Verify Account Does Not Already Exist
    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err)
        return errorResponse(res, {
          status: 500,
          message: "Something went wrong. Please try again"
        });
      if (foundUser)
        return errorResponse(res, {
          status: 400,
          message: "Email address has already been registered. Please try again"
        });
      // Generate Salt (Asynchronous callback version)
      bcrypt.genSalt(10, (err, salt) => {
        if (err)
          return errorResponse(res, {
            status: 500,
            message: "Something went wrong. Please try again"
          });
        // Hash User Password
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err)
            return errorResponse(res, {
              status: 500,
              message: "Something went wrong. Please try again"
            });

          const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hash
          };

          db.User.create(newUser, err => {
            if (err) return errorResponse(res, { status: 500, message: err });
            return successResponse(res, { status: 201, message: "success" });
          });
        });
      });
    });
  },
  // POST Login
  login: (req, res) => {
    if (!req.body.email || !req.body.password) {
      return errorResponse(res, {
        status: 400,
        message: "Please enter your email and password"
      });
    }

    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err)
        return errorResponse(res, {
          status: 500,
          message: "Something went wrong. Please try again"
        });

      if (!foundUser) {
        return errorResponse(res, {
          status: 400,
          message: "Email or password is incorrect."
        });
      }

      bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
        if (err)
          return errorResponse(res, {
            status: 500,
            message: "Something went wrong. Please try again."
          });

        if (isMatch) {
          req.session.loggedIn = true;
          req.session.currentUser = { id: foundUser._id };
          return successResponse(res, {
            status: 200,
            message: "Success",
            data: { id: foundUser._id }
          });
        } else {
          return errorResponse(res, {
            status: 400,
            message: "Email or Password is incorrect."
          });
        }
      });
    });
  },
  // POST Logout
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err)
        return errorResponse(res, {
          status: 500,
          message: "Something went wrong. Please try again."
        });
      res.sendStatus(200);
    });
  },

  // POST Verify
  verify: (req, res) => {
    return successResponse(res, {
      status: 200,
      message: "Current user verified"
    });
  }
};
