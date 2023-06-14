const { loggerQueryService } = require('../db')
const moment = require('moment')
const outer = {}

outer.loggerQueryApi = async (req, res) => {
    const rdata = await loggerQueryService()
    rdata.forEach(e => {
        e.created_at = moment(e.created_at).format('YYYY-MM-DD')
    })
    res.json({
        success: true,
        msg: '',
        code: 0,
        data: rdata,
    })
}
module.exports = outer