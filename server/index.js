const express = require("express")

const app = express()

const mongoose = require("mongoose")

//json中间件
app.use(express.json())
//跨域請求
app.use(require("cors")())


//连接mongodb
mongoose.connect("mongodb://localhost:27017/moba-test", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功")
}).catch(() => {
    console.log("数据库连接失败")
})

//引入模型
// const Category = require("./model/category")
const Category = mongoose.model("Category", new mongoose.Schema({
    name: String
}))

//获取数据列表
app.get("/admin/api/category/", async (req, res) => {
    const categories = await Category.find()
    res.send(categories)
})
//获取数据
app.get("/admin/api/category/:id", async (req, res) => {
    const categories = await Category.findById(req.params.id)
    res.send(categories)
})

//添加数据
app.post("/admin/api/category", async (req, res) => {
    const data = req.body;
    console.log(data)
    const category = await Category.create(data)
    res.send(category)
})

//删除数据
app.delete("/admin/api/category/:id", async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.send("OK")
})



app.listen(3000, () => {
    console.log("3000")
})




