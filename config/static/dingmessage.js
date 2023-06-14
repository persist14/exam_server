const moment = require('moment');

const message = require('./message');

const outer = {};
// 钉钉消息发送

// 函数调用方式

/**
 *
 * @param {type} 消息通知对象名
 * @returns
 */
outer.getDingMessage = async(type) => {
    try {
        return '[' + moment().format('YYYY-MM-DD HH:mm:ss') + ']' + message[type].dingMsg;
    } catch (err){
        return '';
    }

};
module.exports = outer;
