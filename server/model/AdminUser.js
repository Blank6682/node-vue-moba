const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username: { type: String, unique: true }, // 名字唯一
    password: {
        type: String,
        select: false,//默认不返回密码
        //密码加密
        set (val) {
            return require("bcrypt").hashSync(val, 10)
        }
    }
})
module.exports = mongoose.model("AdminUser", schema)