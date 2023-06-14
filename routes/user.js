const express = require('express');
const router = express.Router();

const {loginApi, registerApi, getCurrentUser} = require('../lib/api/index').login;


router.post('/login', loginApi);
router.post('/register', registerApi);
router.get('/getCurrentUser', getCurrentUser);
module.exports = router;
