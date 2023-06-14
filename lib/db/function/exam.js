// 智慧安防数据库操作
const moment = require('moment');
const DB = require('../model');
const outer = {};

// 新建
outer.quesCreateService = async (data) => {
    let result = await DB.Ques.create({
        ...data,
    });
    return result;
};
// 查询
outer.quesQueryService = async (params) => {
    const where = {};
    if (params.qsName) {
        where.title = {'$regex': params.qsName};
    }
    if (params.class) {
        where.class = params.class;
    }
    if (params.diff_level) {
        where.diff_level = params.diff_level;
    }
    let result = await DB.Ques.find({
        ...where,
    }, {__v: 0});
    return result;
};
outer.quesUpdService = async (data) => {
    let result = await DB.Ques.updateOne({
        _id: data.id,
    }, {
        ...data,
    });
    return result;
};
outer.quesDelService = async (id) => {
    let result = await DB.Ques.remove({
        _id: id,
    });
    return result;
};
module.exports = outer;
