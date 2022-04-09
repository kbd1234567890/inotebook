const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { json } = require("express");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "ksaankisfhainath";

// Route1: Create a User using: POST "/api/auth/createuser"  No login required
router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    // If there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        console.log("user", user);
        return res
          .status(400)
          .json({ error: "Sorry user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });

      // verifying the token.   added for understanding purpose.
      let tokenString = authToken;
      console.log(jwt.verify(tokenString, JWT_SECRET));
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 2: Authenticate a User using: POST "/api/auth/login"  No login required
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be exists.").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (errors) {
      console.error(errors.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3: Get loggedin User details using: POST "/api/auth/getuser" login required
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (errors) {
      console.error(errors.message);
      res.status(500).send("Internal server error");
    }
});

module.exports = router;
