const {initSuperHerin, initBase, initDingtalk} = require('./lib/db/function/init');

const {cronJob} = require('./lib/cron');
const websocket = require('./lib/websocket');
const parkWebsocket = require('./lib/websocket/parkManage.js');

// 执行系统初始化
const outer = async () => {
    if (process.env.NODE_APP_INSTANCE && process.env.NODE_APP_INSTANCE.toString() !== '0') return;

    console.log('[system]:系统初始化开始');

    // 执行定时任务
    cronJob().then(() => console.log('[cron]\t定时任务启动'));

    // 初始化websocket
    websocket().then(() => console.log('[websocket]\twebsocket启动'));

    // 初始化停车场websocket
    parkWebsocket().then(() => console.log('[websocket]\t停车管理websocket启动'));

    // 初始化超级管理员
    await initSuperHerin().then(() => console.log('[初始化]\t超级管理员'));

    // 初始化基础数据
    await initBase().then(() => console.log('[初始化]\t基础数据'));

    // 初始化钉钉数据
    await initDingtalk().then(() => console.log('[初始化]\t钉钉数据'));

    // 初始化会议室数据


};

module.exports = outer;
