// 第三方组件
const app = require('./app');
const debug = require('debug')('her:server');
const http = require('http');

// 内部组件
const utils = require('./utils');

// 配置文件
const {PORT} = require('./config/server');

// 设定服务端口号
let port = utils.normalizePort(process.env.PORT || PORT);


// 创建HTTP服务
let server = http.createServer(app);

// 监听服务端口
server.listen(port,  () => {
    console.log('服务已经启用，端口号:' + port + '\n');
});


// 服务器监听错误
server.on('error', (error) => {
    console.log(11111);
    if (error.syscall !== 'listen') throw error;

    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // 处理特殊错误
    switch (error.code) {
        case 'EACCES' :
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + ' 端口已被占用');
            process.exit(1);
            break;
        default :
            throw error;
    }


});


// 监听
server.on('listening', () => {

    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
});
