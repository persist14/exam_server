// 引入依赖
const _ = require('lodash');

// 通用头部
exports.header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
};

// 将端口号信息变化为数字
exports.normalizePort = val => {
    let port = parseInt(val, 10);
    // named pipe
    if (isNaN(port)) return val;
    // port number
    if (port >= 0) return port;
    return false;
};

// 产生n位随机数
exports.rndNum = n => Math.floor(Math.random() * (Math.pow(10, n) - Math.pow(10, n - 1) + 1) + Math.pow(10, n - 1));

// 检查手机号码有效性
exports.isValidPhone = n => /^(((13[0-9])|(15[0-9])|(18[0-9]))+\d{8})$/.test(n);

// 身份证正则
exports.isValidIdcard = str => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str);

// 邮箱正则
exports.isValidEmail = str => /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(str);
// 2-10位汉字
exports.isValidName = str => /^[\u4e00-\u9fa5]{2,10}$/.test(str);