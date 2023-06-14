// 第三方 账号信息

module.exports = {

    // 软通 api 地址
    'isoftstone': {
        'ROMA_SERVER': 'http://113.135.192.25:28080/roma-in',
        'ROMA_KEY': '92ad34a92d0f09492ab6b754c6037eb55cc78c19bc',
        'ROMA_SECRET': 'http://113.135.192.25:28080/roma-in',
    },

    // IOC - MySQL - 公网
    'IOC': {
        'ip': '113.135.192.25',
        'port': 23306,
        'username': 'roma',
        'password': 'Roma@1234',
        'db': 'dev_park_ioc',
    },

    // 无人超市 - SQLServer
    'MARKET': {
        // 'db': 'master',
        'db': 'WuRenChaoShi',
        'ip': '10.168.152.168',
        'port': 1433,
        'username': 'sa',
        'password': 'gechuangwei@1234',
    },

    // 灯杆 - api
    'POLE': {
        'ip': 'http://113.135.192.25:40001',
        'projectId': '1',
        'username': 'xbddj',
        'password': 'iotcomm@2021',
    },

    // 财务数据库 - sql server
    'INCOME': {
        'db': 'MkMis_xbd_NEWOS',
        // 'db': 'dbo',
        'ip': '10.168.113.250',
        'port': 1433,
        'username': 'huawei',
        'password': '123',
    },
    // 清扫机器人配置
    'CLEAN': {
        'grant_type': 'urn:gaussian:params:oauth:grant-type:open-access-token',
        'client_id': 'KsFddol0vH3VV133jTMs6oUM',
        'client_secret': 'Evw8fONbChkWrTs62vEeWuk87OpWacyVKjHrVo6OhlX5tzyE469fj',
        'open_access_key': 'd5bdfba292a109598955ba45389c33e5',
    },

    // 公务用车数据库--只可查询!!!--只可操作offical-cat库
    'VEHICLE': {
        'host': '10.168.33.50',
        'user': 'beyond',
        'password': 'beyond',
        'database': 'official-car',
        'port': 3306,
        'multipleStatements': true,
    },

};

// 健康小屋 项目编号
// 10	尿常规
// 20	餐前血糖
// 21	餐后30分钟血糖
// 22	餐后60分钟血糖
// 23	餐后120分钟血糖
// 30	血压检测
// 31	血压检测（右侧）
// 40	血氧检测
// 50	体温检测
// 70	血红蛋白
// 80	心电检测
// 90	身高体重
// 130	血脂
// 140	肺功能
// 180	体脂（人体成份）
// 190	身高体重体脂
// 200	胎心
// 210	尿酸
// 220	尿糖
// 230	中医体质辨识
// 240	视力
// 250	电子尺