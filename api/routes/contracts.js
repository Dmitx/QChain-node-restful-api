const express = require("express");
const router = express.Router();

const ContractsController = require('../controllers/contracts');
const checkAuth = require('../middleware/check-auth');

// Handle incoming GET requests to /orders
router.get("/:userId", checkAuth, ContractsController.contracts_get_user_all);

router.post("/:userId", checkAuth, ContractsController.contracts_create_contract);

module.exports = router;