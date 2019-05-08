const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require(path.join(__dirname, "routes", "api", "users"));
const profile = require(path.join(__dirname, "routes", "api", "profile"));
const posts = require(path.join(__dirname, "routes", "api", "posts"));

const app = express();

//body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require(path.join(__dirname, "config", "keys")).mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to the database"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require(path.join(__dirname, "config", "passport"))(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port);
