const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: String,
    items: [{
        url: String,
        image: String
    }]
})

module.exprots = mongoose.model("Ad", schema)