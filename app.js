// 第三方组件
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const checkTOken = require('./middware/check_token');
const saveLogger = require('./middware/save_logger')


// 实例化express
const app = express();

// 允许跨域
app.use(cors())

// 静态文件
app.use(express.static('public'));

// log4js 记录logger
// let {logPart, format} = require('./config/log');
// app.use(log4js.connectLogger(logPart, {format}));


// 关在express中间件,要放在路由之前
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// 使用JWT验证Token，排除一些不需要验证的路径
app.use(checkTOken);

app.use(saveLogger)


// 路径路由，放在最后
routes(app);

// jwt,404 捕获
app.use(function (err, req, res, next) {
    let text = ''; // 提示文字
    let code = 404;
    switch (err.name) {
        case 'UnauthorizedError' :
            text = 'No Auth';
            code = 401;
            break;
        default :
            text = 'Not Found';
            code = 404;
    }
    res.status(code)
        .json({success: false, msg: text});
});

// 错误处理
// app.use(function (err, req, res) {
//     console.log(err, '>>>>>>>>');
//     // res.locals.message = err.message;
//     // res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // 返回错误消息
//     // res.status(err.status || 500);
//     // res.json({success: false, msg: err.message || 'err'});
// });

module.exports = app;
