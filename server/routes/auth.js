const express = require("express");
const router = express.Router();

//middleware
const { authCheck, adminCheck } = require("../middleware/auth");

//controller
const { crudUser, currentUser } = require("../controllers/auth");

router.post("/crud-user", authCheck, crudUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
