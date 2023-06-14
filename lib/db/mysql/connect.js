const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('mysql', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})



async function connect() {
    try {
        await sequelize.authenticate();

        console.log('mysql ----- 连接成功');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect()

module.exports = sequelize