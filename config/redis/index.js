// redis 配置

module.exports = {
    REDIS_NAME: 'xbd_app', // redis名称
    // REDIS_SERVER: '192.168.81.136', // 服务器地址
    REDIS_SERVER: '127.0.0.1',
    REDIS_PORT: 6379,
};


// redis 键名汇总
// 账号角色变更: `${REDIS_NAME}:admin-role:${user._id}`
// 员工角色变更: `${REDIS_NAME}:ding-role:${user._id}`
// 首页天气: `${REDIS_NAME}:weather:homepage:${longitude.toFixed(2)}:${latitude.toFixed(2)}`
// 天气详情: `${REDIS_NAME}:weather:detail:${longitude.toFixed(2)}:${latitude.toFixed(2)}`