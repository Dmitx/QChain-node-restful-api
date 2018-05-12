const express = require("express");
const router = express.Router();

const ContractsController = require('../controllers/contracts');
const checkAuth = require('../middleware/check-auth');

// Handle incoming requests
router.get("/:userId", checkAuth, ContractsController.contracts_get_user_all);

router.post("/:userId", checkAuth, ContractsController.contracts_create_contract);

router.patch("/:contractId", checkAuth, ContractsController.contracts_update_contract);

router.delete("/:contractId", checkAuth, ContractsController.contracts_delete_contract);

module.exports = router;