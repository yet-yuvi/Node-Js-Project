const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Create a user
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

// Get all users
router.get('/', async(req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

// Get one user
router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(user) {
            res.json(user);
        }
        else {
            res.status(404).json({message: "User not found"});
        }
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

// Update one user
router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const userBody = {
            fname: req.body.fName,
            lname: req.body.lName
        }
        const newUser = await User.findByIdAndUpdate(id, userBody, {new: true});
        
        if(newUser) {
            res.json(newUser);
        }
        else {
            res.status(404).json({message: "User not found"});
        }
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

// Delete one user
router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        //const deletedUser = await User.findByIdAndDelete({_id: id});
        if(deletedUser) {
            res.json({message: "User has been deleted"});
        }
        else {
            res.status(404).json({message: "User not found"});
        }
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong"});
    }
})



module.exports = router;