// 设备全量数据
const mongoose = require('mongoose');
const {SCHEMA_OPTIONS} = require('../../../config/db');

// 定义模式
const Schema = mongoose.Schema;

const _Question = new Schema({
    title: String, // 题目
    class: String, // 班级
    score: Number, // 分值
    titleType: String, // 题目类型
    diff_level: Number, // 难度系数
    prodName: String, // 出题人姓名
    answer: String, // 答案
}, SCHEMA_OPTIONS);

module.exports = _Question;
