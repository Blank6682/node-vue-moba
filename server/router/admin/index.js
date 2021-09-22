
module.exports = app => {
    const express = require("express")
    const jwt = require("jsonwebtoken")

    //设置请求返回状态数据
    const assert = require("http-assert")
    const AdminUser = require("../../model/AdminUser")
    const router = express.Router({
        mergeParams: true
    })

    //获取资源列表
    router.get("/", async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    //获取资源详情
    router.get("/:id", async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //添加资源
    router.post("/", async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //更新资源
    router.put("/:id", async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除资源
    router.delete("/:id", async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id);
        res.send({
            success: true
        })
    })


    //引入自定义中间件
    const resourceMiddleware = require("../../middleware/resource")

    app.use("/admin/api/rest/:resource", resourceMiddleware(), router)

    //引入上传文件组件
    const multer = require("multer")
    // const MAO = require("multer-aliyun-oss")
    const upload = multer({
        dest: __dirname + "/../../public/uploads"
        // storage:MAO({
        //     config: {
        //         region: '<region>',//源
        //         accessKeyId: '<accessKeyId>',//替换为你的ID
        //         accessKeySecret: '<accessKeySecret>',//你的secret
        //         bucket: 'node-vue-moba'//路径
        //     }
        // })    
    })
    app.post("/admin/api/upload", upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    async function addAdminUser () {
        await AdminUser.insertMany({
            username: "admin",
            password: "123456"
        })
    }
    addAdminUser()
    app.post("/admin/api/login", async (req, res) => {
        const { username, password } = req.body
        //找到用户
        const user = await AdminUser.findOne({ username }).select("+password")
        assert(user, 422, "用户不存在")
        //校验密码
        const isValid = require("bcrypt").compareSync(password, user.password)
        assert(isValid, 422, "密码正确")
        //返回token
        const token = jwt.sign({ id: user._id }, app.get("secret"))
        res.rend(token)
    })

}