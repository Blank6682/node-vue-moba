//登录校验中间件
module.exports = options => {
    const AdminUser = require("../model/AdminUser")
    const jwt = require("jsonwebtoken")
    const assert = require("http-assert")
    // const ok = require('assert')

    return async (req, res, next) => {
        const token = req.headers.token || ""
        try {
            if (token) {
                const { id } = jwt.verify(token, req.app.get("secret"))
                req.user = await AdminUser.findById(id)
                assert(req.user || id, 401, "请先登录")
            }
            assert(token, 401, "请先登录")
            //  try {
            //     assert(token, 401, "请先登录")
            // }
            // catch (err) {
            //     ok(err.status === 401)
            //     ok(err.message === '请先登录')
            //     ok(err.expose)
            // }
            await next()
        } catch (err) {
            await next(err)
        }

    }
}