const { loggerCreateService } = require('../lib/db/function/logger')
const moment = require("moment");
module.exports = async (req, res, next) => {
    // date: new Date(),
    //     user: '张三',
    //     operator: '删除',
    //     time: '12:00:00',
    //     hash: 'sdhad',
    //     truth: '1'
    const whilte = ['/api/login', '/api/register']
    if(!whilte.includes(req.url) && req.method !== 'GET' ){
        const user = req.user
        loggerCreateService({
            date: new Date(),
            user: user.username,
            operator: req.method === 'PUT' ? '修改' : req.method === 'POST' ? '新增' : '删除',
            time: moment().format('HH:mm:ss'),
            hash: '',
            truth: ''
        })
    }
    next()
};
