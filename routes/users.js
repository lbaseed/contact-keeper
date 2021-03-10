const express = require("express")
const router = express.Router()
//vaidation using express import
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
// const Contact = require('../models/Contact');

// @route    POST       api/users
// @desc     Register a user
//@access    Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      //check if a user with the supplied email exist
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: "User already exist" })
      } else {
        //create new user instance
        user = new User({
          name,
          email,
          password,
        })

        //hash provided password with bcrypt and save to db
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()

        //respond with a Json Web Token after successfull registration
        const payload = {
          user: {
            id: user.id,
          },
        }
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 36000,
          },
          (err, token) => {
            if (err) throw err
            res.json({ token })
          }
        )
      }
    } catch (err) {
      console.error(err.message)
      return res.status(500).send("Server Error")
    }
  }
)

module.exports = router
