const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username: String,
    password: {
        type: String,
        set (val) {
            return require("crypto").createHash(val, 6)
        }
    }
})
module.exports = mongoose.model("AdminUser", schema)