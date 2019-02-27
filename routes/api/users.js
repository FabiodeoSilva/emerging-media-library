const path = require("path");
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require(path.join(__dirname, "..", "..", "models", "User.js"));

// @route   GET api/users/test
// @desc    Test users route
// @access  Public

router.get("/test", (req, res) => res.send({ mesg: "user works" }));

// @route   Post api/users/test
// @desc    register new user
// @access  Public
router.post("/register", (req, res) => {
  console.log("here");
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
