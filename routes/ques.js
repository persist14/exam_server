const express = require('express');
const router = express.Router();

const {quesCreateApi, quesQueryApi, quesUpdApi, quesDelApi} = require('../lib/api/index').question;

router.get('/', quesQueryApi);
router.post('/add', quesCreateApi);
router.put('/', quesUpdApi);
router.delete('/:id', quesDelApi);
module.exports = router;
