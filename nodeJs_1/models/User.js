const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},{timestamps: true});

module.exports = User = mongoose.model('User', UserSchema);