const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.patch("/reset_password/:userId", checkAuth, UserController.user_reset_password);

router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;