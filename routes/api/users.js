const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.send({ mesg: "user works" }));

module.exports = router;
