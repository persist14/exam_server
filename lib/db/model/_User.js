// 设备全量数据
const mongoose = require('mongoose');
const {SCHEMA_OPTIONS} = require('../../../config/db');

// 定义模式
const Schema = mongoose.Schema;

const _User = new Schema({
    username: String,
    password: String,
    points: {
        type: Number,
        default: 0,
    },
}, SCHEMA_OPTIONS);

module.exports = _User;
