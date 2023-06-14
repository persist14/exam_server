const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./connect')

const _Logger = sequelize.define('logger', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        required: false,
        commit: '日期'
    },
    user: {
        type: DataTypes.STRING,
        required: false,
        commit: '用户'
    },
    operator: {
        type: DataTypes.STRING,
        required: false,
        commit: '操作'
    },
    time: {
        type: DataTypes.STRING,
        required: false,
        commit: '时间'
    },
    hash: {
        type: DataTypes.STRING,
        required: false,
        commit: 'hash值'
    },
    truth: {
        type: DataTypes.STRING,
        required: false,
        commit: '真实性'
    }

}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = _Logger