const mongoose = requrie("mongoose")

const Category = mongoose.model("Category", new mongoose.Schema({
    name: String
}))

module.exports = Category