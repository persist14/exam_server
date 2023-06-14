// 记录log

const log4js = require('log4js');
const path = require('path');

// log4js 配置
log4js.configure({
    appenders: {
        logToFile: {
            type: 'file',
            filename: path.join(__dirname, `../../logs/${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.log`),
            maxLogSize: 5000000,
            keepFileExt: true,
            layout: {
                type: 'pattern',
                pattern: '--TIME: %d --LEVEL: %p --HOST: %h %m %n', // %d 请求时间,$p 日志level,%m connectLogger里设置的log格式,%n 换行
            },
        },
        console: {
            type: 'console',
        },
        'lightLog': {
            type: 'file',
            filename: path.join(__dirname, `../../logs/${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-light.log`),
            maxLogSize: 5000000,
            keepFileExt: true,
            layout: {
                type: 'pattern',
                pattern: '--TIME: %d --LEVEL: %p --HOST: %h %m %n ', // %d 请求时间,$p 日志level,%m connectLogger里设置的log格式,%n 换行

            },
        },
    },
    categories: {
        logToFile: {
            appenders: ['logToFile'],
            level: 'all',
        },
        lightLog: {
            appenders: ['lightLog', 'console'],
            level: 'all',
        },
        default: {
            appenders: ['console'],
            level: 'all',

        },
    },
});
const format = '--ETIME: :response-time --IP: :remote-addr --METHOD: :method --URL: :url --STATUS: :status --UA: :user-agent --REFERRER: :referrer --LEN: :content-length --user: :req[authorization]';
const logPart = log4js.getLogger('logToFile');
const lightLog = log4js.getLogger('lightLog');

module.exports = {logPart, format, lightLog};
