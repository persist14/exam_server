const sequelize = require('./connect')
const logger = require('./_Logger')

// async function SyncSchema () {
//     await sequelize.sync({ force: true });
//     console.log("所有模型均已成功同步.");
// }
// SyncSchema()
module.exports = {
    Logger: logger
}
