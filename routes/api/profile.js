const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.send({ mesg: "profile works" }));

module.exports = router;
