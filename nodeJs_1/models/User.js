const mongoose = require('mongose');

const UserSchema = new mongoose.Schema({
    fName: {
        type: String
    },
    lName: {
        type: String
    }
})

module.exports = User = mongoose.model('User', UserSchema);