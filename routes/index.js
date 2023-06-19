module.exports = (app) => {
    app.use('/api/', require('./user')); // exam 接口
    app.use('/api/ques', require('./ques'));
    app.use('/api/logger', require('./logger'))
};
