const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "you hit the user API",
  });
});

module.exports = router;
