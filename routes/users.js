const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const authRequired = require("../middleware/authRequired");

module.exports = router
  // Curent Path '/api/v1/users/
  .get("/:id", authRequired, ctrl.user.show)
  .get("/", ctrl.user.index);
