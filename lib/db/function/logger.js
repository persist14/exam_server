
const mysqlDB = require('../mysql/index')
const outer = {}

outer.loggerCreateService = async(data) => {
    const result = await mysqlDB.Logger.create({
       ...data
    }, { raw: true })

}
outer.loggerQueryService = async(data) => {
        const { page = 1, pageSize = 10 } = data
        const result = await mysqlDB.Logger.findAll({raw: true,
        offset: (page - 1) * Number(pageSize),
        limit: Number(pageSize)
    })
    const total = await mysqlDB.Logger.count()
    console.log(total, 'mysql count')
    return {
        result,
        total
    }
}
module.exports = outer