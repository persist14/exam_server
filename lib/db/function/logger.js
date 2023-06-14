const sequelize = require('sequelize')
const mysqlDB = require('../mysql/index')
const outer = {}

outer.loggerCreateService = async(data) => {
    const result = await mysqlDB.Logger.create({
       ...data
    }, { raw: true })

}
outer.loggerQueryService = async() => {
    const result = await mysqlDB.Logger.findAll({raw: true})
    return result
}
module.exports = outer