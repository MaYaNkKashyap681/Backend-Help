const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    date: {type: Date, default: Date.now}
})

const userModel = mongoose.model('userModel',userSchema)

module.exports = userModel