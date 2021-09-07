const express = require("express")

const app = express()

const mongoose = require("mongoose")

//json中间件
app.use(express.json())

//连接mongodb
mongoose.connect("mongodb://localhost:27017/express-test", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功")
}).catch(() => {
    console.log("数据库连接失败")
})

app.listen(3000, () => {
    console.log("3000")
})




