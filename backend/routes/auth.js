const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Create a User using: POST "/api/auth/createuser"  No login required
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

      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json({ success: "success" });
    }catch (error) {
      console.error(error);
      res.status(500).send('some error occured');
    }
    //   .then((user) => {
    //     res.json(user);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.json({
    //       msg: "please enter a unique value for email",
    //       error: err.message,
    //     });
    //   });
  }
);

module.exports = router;
