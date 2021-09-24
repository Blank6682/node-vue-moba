const express = require("express")

const app = express()

//添加中间件
//json
app.use(express.json())
//跨域請求
app.use(require("cors")())

app.set("secret", "blankzro6682")//设置密钥

app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use("/uploads", express.static(__dirname + "/public/uploads"))

require("./router/admin")(app)
require("./plugins/db")(app)

app.listen(3000, () => {
    console.log("3000")
})