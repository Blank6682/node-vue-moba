const express = require("express")

const app = express()

//添加中间件
//json
app.use(express.json())
//跨域請求
app.use(require("cors")())

app.use("/uploads", express.static(__dirname + "/uploads"))
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))

require("./router/admin")(app)
require("./plugins/db")(app)


app.listen(3000, () => {
    console.log("3000")
})




