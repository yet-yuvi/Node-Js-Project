const mongoose = require('mongoose');
const router = express.Router();
const User = require('../../models/User');

router.post('/', async(req, res) => {
    const userObject = {
        fname: req.body.fname,
        lname: req.body.lname
    }
    const user = new User(userObject);
    await user.save();
    res.status(201).json(user);
})