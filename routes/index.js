module.exports = (app) => {
    app.use('/', require('./user')); // exam 接口
    app.use('/ques', require('./ques'));
    app.use('/logger', require('./logger'))
};
