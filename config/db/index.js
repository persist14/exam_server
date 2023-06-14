module.exports = {
    // Mongo
    DB_SERVER: '127.0.0.1:27017', // 服务器地址
    // DB_SERVER: '192.168.81.136', // 服务器地址
    DB_NAME: 'exam', // 数据库名称
    // DB_USER: 'xbd', // 数据库用户名
    // DB_SECRET: 'xw40-9H8(5a3k+h*7y', // 数据库密码

    // 配置信息
    DB_OPTIONS: {
        'useNewUrlParser': true,
        'useCreateIndex': true,
        'useFindAndModify': false,
        'useUnifiedTopology': true,
    },

    // schema 配置
    SCHEMA_OPTIONS: {
        // 设置时间格式
        'timestamps': {
            'createdAt': 'created_at',
            'updatedAt': 'updated_at',
        },
    },
};

// use xbd_app_db
// 创建数据库用户
// db.createUser({
//     user: 'xbd',
//     pwd: 'xw40-9H8(5a3k+h*7y',
//     roles: [{
//         role: 'readWrite',
//         db: 'xbd_app_db',
//     }],
// });
