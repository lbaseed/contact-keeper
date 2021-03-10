const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');


// @route    GET       api/auth
// @desc     Get logged in user
//@access    Private
//use this route to verify a logged in user given token
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password')

        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error');
    }
});

// @route    POST       api/auth
// @desc     Auth user and get token
//@access    Public
//use this route to login an authorised user and return token
router.post('/', [
    check('email', 'Please enter valid email address').isEmail(),
    check('password', 'Please enter a password').exists()

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        //check if user exist
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentails' });
        }

        //check is the existing user password match with supplied password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err
            res.json({ token })
        });



    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error')
    }
});


module.exports = router