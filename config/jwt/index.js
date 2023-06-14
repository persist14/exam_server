module.exports = {
    // JWT
    JWT_SECRET: 'H#$(Pgu:?L@YIQ', // jwt秘钥
    JWT_EXPIRE_APP: '180d', // jwt过期时间
    IGNORE_PATH: [ // jwt 忽略地址
        '/login',
        '/register',
    ],
};
