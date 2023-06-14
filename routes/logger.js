const express = require('express');
const router = express.Router();

const { loggerQueryApi } = require('../lib/api/index').logger;

router.get('/', loggerQueryApi);
module.exports = router;
