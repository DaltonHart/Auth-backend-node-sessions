const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const authRequired = require("../middleware/authRequired");

module.exports = router
  // Current Path '/api/v1/auth'

  // POST Register
  .post("/register", ctrl.auth.register)
  // POST Login
  .post("/login", ctrl.auth.login)
  // Post Verify
  .post("/verify", authRequired, ctrl.auth.verify)
  // Post Logout
  .post("/logout", ctrl.auth.logout);
