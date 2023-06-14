const {quesCreateService, quesQueryService, quesUpdService, quesDelService} = require('../db');
const moment = require('moment');
const outer = {};

outer.quesCreateApi = async (req, res) => {
    const data = req.body;
    data.prodName = req.user.username;
    const rdata = await quesCreateService(data);
        if (rdata._id) {
        res.json({
            success: true,
            msg: '',
            data: null,
            code: 0,
        });
    } else {
        res.json({
            success: true,
            msg: '新建失败',
            code: 4001,
        });
    }
};

outer.quesQueryApi = async (req, res) => {
    const params = req.query;
    let rdata = await quesQueryService(params);
    rdata = rdata.map(e => {
        e = {
            ...e._doc,
            created_at: moment(e.created_at)
                .format('YYYY-MM-DD HH:mm:ss'),
        };
        return e;
    });
    if (rdata) {
        res.json({
            success: true,
            msg: '',
            data: rdata,
            code: 0,
        });
    } else {
        res.json({
            success: true,
            msg: '查询失败',
            code: 4000,
        });
    }
};

outer.quesUpdApi = async (req, res) => {
    const rdata = await quesUpdService(req.body);
    if (rdata.nModified) {
        res.json({
            success: true,
            msg: '',
            data: '',
            code: 0,
        });
    } else {
        res.json({
            success: true,
            msg: '',
            data: '',
            code: 4004,
        });
    }

};

outer.quesDelApi = async (req, res) => {
    const id = req.params.id;
    const rdata = await quesDelService(id);
    if (rdata.deletedCount) {
        res.json({
            success: true,
            msg: '',
            data: null,
            code: 0,
        });
    } else {
        res.json({
            success: true,
            msg: '',
            data: null,
            code: 4002,
        });
    }

};

module.exports = outer;
