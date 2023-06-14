module.exports = {
    // 默认密码
    'USER_DEFAULT_PASSWORD': '666666',
    'ADMIN_DEFAULT_PASSWORD': 'admin123',

    // RSA 加密配置
    'RSA': require('./rsa'),

    // 模拟数据
    'SIMULATE': require('./simulate'),

    // 管理员
    'ADMIN': require('./admin'),

    // 路径权限
    'ROUTER_AUTH': require('./auth'),
};