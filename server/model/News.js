const mongoose = require("mongoose")

const schema = mongoose.Schema({
    categories: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
    title: String,
    content: String
}, {
    timestamps: true
})

module.exports = mongoose.model("News", schema)