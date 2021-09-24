module.exports = options => {
    return async (err, req, res, next) => {
        // console.log(err, "错误")
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    }
}