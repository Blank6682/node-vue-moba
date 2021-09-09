module.exports = app => {
    const express = require("express")

    const router = express.Router({
        mergeParams: true
    })

    //获取资源列表
    router.get("/", async (req, res) => {
        const model = await req.Model.find()
        res.send(model)
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

    app.use("/admin/api/:resource", resourceMiddleware(), router)

}