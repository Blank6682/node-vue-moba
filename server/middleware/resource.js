module.exports = options => {
    return async (req, res, next) => {
        //单词转换复数
        const mondleName = require('inflection').classify(req.params.resource)
        req.Model = require(`../model/${mondleName}`)
        next()
    }
}