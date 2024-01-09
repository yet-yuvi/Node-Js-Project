const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.post('/', async(req, res) => {
    console.log('Request Body:', req.body);
    const userObject = {
        fname: req.body.fName,
        lname: req.body.lName
    }
    const user = new User(userObject);
    await user.save();
    res.status(201).json(user);
})

module.exports = router;