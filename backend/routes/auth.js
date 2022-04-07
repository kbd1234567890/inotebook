
const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a User using: POST "/api/auth" Doesn't require authentication
router.post('/', body('name', 'Enter a valid name').isLength({min: 3}), 
    body('email', 'Enter a valid email').isEmail(), 
    body('password','Password must be at least 5 characters').isLength({ min: 5 }),
    (req, res) => {
    console.log(req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.log(err);
        res.json({msg: "please enter a unique value for email", error: err.message});
    });
});

module.exports = router;