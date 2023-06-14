const {IGNORE_PATH, JWT_SECRET} = require('../config/jwt');
const JWT = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    console.log(req.url);
    if (!IGNORE_PATH.includes(req.url)) {
        await JWT.verify(req.headers.authorization, JWT_SECRET, (err, decoed) => {
            console.log(err);
            if (err && err.name === 'JsonWebTokenError') {
                res.send({
                    success: false,
                    data: 'token 无效',
                    message: err.message,
                });
            } else {
                req.user = decoed.data;
                next();
            }
        });
    } else {
        next();
    }
};
