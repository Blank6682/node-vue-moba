const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: String,
    imgUrl: String
})

module.exports = mongoose.model("Equipment", schema)