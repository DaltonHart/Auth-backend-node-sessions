const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

router
  // Current Path
  // '/api/v1/auth'

  // POST Register
  .post("/register", ctrl.auth.register);

module.exports = router;
