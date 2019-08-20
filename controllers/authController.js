const bcrypt = require("bcryptjs");
const db = require("../models");
const validate = require("../validation/register");

module.exports = {
  // POST register
  register: (req, res) => {
    const { errors, notValid } = validate(req);

    if (notValid) return res.status(400).json({ status: 400, errors });

    // Verify Account Does Not Already Exist
    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again"
        });
      if (foundUser)
        return res.status(400).json({
          status: 400,
          message: "Email address has already been registered. Please try again"
        });
      // Generate Salt (Asynchronous callback version)
      bcrypt.genSalt(10, (err, salt) => {
        if (err)
          return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again"
          });
        // Hash User Password
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err)
            return res.status(500).json({
              status: 500,
              message: "Something went wrong. Please try again"
            });

          const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hash
          };

          db.User.create(newUser, (err, savedUser) => {
            if (err) return res.status(500).json({ status: 500, message: err });
            res.status(201).json({ status: 201, message: "success" });
          });
        });
      });
    });
  }
};
