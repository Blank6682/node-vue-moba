module.exports = app => {
    const mongoose = require("mongoose")

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

    // require('../model/Category')
    //导入指定路径下所有文件
    require("require-all")(__dirname + '/../model')
}


