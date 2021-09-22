const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: String,
    password: {
        type: String
    }
})

module.exports = mongoose.model("AdminUser", schema)