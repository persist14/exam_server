const {loginService, registerService} = require('../db');
const DB = require('../db/model/index')
const Jwt = require('jsonwebtoken');
const md5 = require('md5');
const {JWT_SECRET, JWT_EXPIRE_APP} = require('../../config/jwt');
const outer = {};

outer.loginApi = async (req, res) => {
    const data = req.body;
    if (data.password) {
        data.password = md5(data.password);
    }
    const findUser = await loginService(data);
    let rdata = {
        success: true,
        msg: '',
        code: 0,
        data: null,
    };
    if (findUser && findUser.msg) {
        rdata.msg = findUser.msg;
    } else {
        delete findUser.password;
        const token = Jwt.sign({data: findUser}, JWT_SECRET, {expiresIn: JWT_EXPIRE_APP});
        findUser.token = token;
        rdata.data = {
            ...findUser._doc,
            token,
        };
        rdata.data.token = token;
    }
    res.json(rdata);
};
outer.registerApi = async (req, res) => {
    const data = req.body;
    if (data.password && data.username) {
        data.password = md5(data.password);
    }
    const rdata = await registerService(data);
    res.json({
        success: true,
        msg: '',
        data: rdata,
        code: 0,
    });
};

outer.getCurrentUser = async (req, res) => {
    const user = await DB.User.findById(req.user._id)
    res.json({
        success: true,
        data: {
            username: user.username,
            pointer: user.points,
        },
    });
};

module.exports = outer;
