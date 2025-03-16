const express = require('express')
const User = require('../models/User')
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 charecters').isLength({min: 5})
], async(req, res) => {
    const {name, email, password} = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({error: error.array()})
    }
    try {
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({error: 'Sorry a user with this email is already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user = await User.create({
          name,
          email,
          password: hashPassword
        });
        res.status(201).json({_id: user.id, email: user.email})
    } catch (error) {
        res.status(500).json({error: 'data is invalid'})
    }
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password is required').exists()
], async(req, res) => {
    const {email, password} = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({error: error.array()})
    }
    try {
        let user = await User.findOne({email})
        if (user && await bcrypt.compare(password, user.password)){
          const authToken = jwt.sign({
            user: {
                  name: user.name,
                  email: user.email,
                  id: user.id
                }
            }, process.env.JWT_SECRET);
            res.status(201).json({authToken})
        } else {
            res.status(500).json({error: 'data is invalid', message: error.message})
        }
    } catch (error) {
        res.status(500).json({error: 'data is invalid', message: error.message})
    }
})

router.get('/getuser', fetchuser, async(req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({error: 'data is invalid', message: error.message})
    }
})

module.exports = router