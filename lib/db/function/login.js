const moment = require('moment');
const DB = require('../model');
const outer = {};

outer.loginService = async (data) => {
    const findUser = await DB.User.findOne({
        username: data.username,
    });
    if (findUser && !findUser._id) { // 用户不存在
        return {msg: '用户存在'};
    }
    const validPwd = await DB.User.findOne({
        ...data,
    });
    if (!validPwd) {
        return {msg: '用户名或者密码错误'};
    }

    return validPwd;
};
outer.registerService = async (data) => {
    let rdata = await DB.User.create(data);
    return rdata;
};
// function 获取指定点位数据的信息

module.exports = outer;
