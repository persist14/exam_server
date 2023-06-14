// 引入依赖
// 第三方组件
const mongoose = require('mongoose');

// 配置文件
const {DB_NAME, DB_OPTIONS} = require('../../../config/db');

// 数据库连接选项
let option = {
    ...DB_OPTIONS,
};

// 连接数据库
mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`, option, (err) => {
    if (err) throw err;
    console.log('mongodb ------ 连接成功');
});

// 导出对象
const DB = {};

// 创建Model

DB.User = mongoose.model('user', require('./_User'), 'user');
DB.Ques = mongoose.model('question', require('./_Question'), 'question');


// 导出
module.exports = DB;
