// 错误返回代码
module.exports = {
    // 权限
    'PERMISSION_DENIED': {'code': 401, 'text': '没有权限进行访问'},
    'PERMISSION_CHANGED': {'code': 402, 'text': '账号权限已被修改'},
    // 登录
    'LOGIN_CODE_NOT_EMPTY': {'code': 10000, 'text': '账号不能为空'},
    'LOGIN_PASSWORD_NOT_EMPTY': {'code': 10001, 'text': '密码不能为空'},
    'LOGIN_CODE_HAVE_SPACE': {'code': 10002, 'text': '输入存在空格,请重新输入'},
    'LOGIN_NOT_CORRECT': {'code': 10003, 'text': '请输入正确的账号或密码'},
    'LOGIN_NOT_PERMITTED': {'code': 10004, 'text': '登录失败!该账号已禁用,请联系管理员'},
    'LOGIN_NOT_FREEZE': {'code': 10005, 'text': '登录失败!该账号无登录权限,请联系管理员'},
    // 角色管理
    'ROLE_NAME_IS_EXIST': {'code': 20001, 'text': '已存在,请重新输入'},
};