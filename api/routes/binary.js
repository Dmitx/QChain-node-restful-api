const express = require("express");
const router = express.Router();

const BinaryController = require('../controllers/binary');
const checkAuth = require('../middleware/check-auth');

// Handle incoming requests
router.get("/:binaryType", checkAuth, BinaryController.binary_get_type);

router.post("/", checkAuth, BinaryController.binary_create);

router.patch("/:binaryType", checkAuth, BinaryController.binary_update_type);

router.delete("/:binaryType", checkAuth, BinaryController.binary_delete_type);

module.exports = router;