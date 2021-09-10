const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: String,
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" }
})

//建立虚拟表关联
//自身子分类
schema.virtual("children", {
    localField: "_id",//本地哪个键关联
    foreignField: "parent",//外联哪个字段
    justOne: false,
    ref: "Category",
})

// //英雄表
// schema.virtual("Hero", {
//     localField: "_id",
//     ref: "Category",
//     foreignField: "categories",
//     justOne: false
// })

module.exports = mongoose.model("Category", schema)