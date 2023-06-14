module.exports = {

    'env': {
        'browser': true,
        'es6': true,
        'node': true,
    },

    parserOptions: {
        ecmaVersion: 9,
        sourceType: 'module',
    },

    rules: {
    // 不设置
        'no-console': 0, // 禁止使用console

        // 警告
        semi: [1, 'always'], // 结尾双引号
        indent: [1, 4, { SwitchCase: 1 }], // 4个空格缩进
        quotes: [1, 'single'], // 字符串使用单引号
        'no-extra-semi': 1, // 多余的分号
        'no-cond-assign': [2, 'always'], // if, while等条件中不允许使用“=”
        'newline-per-chained-call': [1, { ignoreChainWithDepth: 5 }], // 链式调用时换行
        'no-unused-vars': 1, // 没有被调用的函数
        'comma-dangle': [1, 'always-multiline'], // 结尾逗号，多行必须添加
        'no-multi-spaces': 1, // 多余的空格
        'no-trailing-spaces': 1, // 结尾没有空格
        'no-mixed-spaces-and-tabs': 1, // 不允许空格TAB混用
        'no-multiple-empty-lines': [1, { max: 2, maxEOF: 1 }], // 空格间距两行
        'spaced-comment': ['warn', 'always', { exceptions: ['-', '+', '*'] }], // 在注释中使用一致的空格
        'arrow-spacing': ['warn', { before: true, after: true }], // 箭头函数前后使用一致的空格
        'comma-spacing': ['warn', { before: false, after: true }], // 逗号前后使用一致的空格
        'semi-style': ['warn', 'last'], // 分号的位置在最后
        'switch-colon-spacing': ['warn', { after: false, before: true }], // switch中冒号周边空格
        'no-implicit-coercion': 'warn', // 禁止使用较短的符号实现类型转换
        'no-empty-pattern': 'warn', // 禁止使用空解构模式
        'dot-notation': 'warn', // 要求使用点号
        'no-extra-parens': 'warn', // 禁止冗余的括号
        'key-spacing': ['warn', {'afterColon': true}], // 在对象字面量的键和值之间使用一致的空格
        'keyword-spacing': ['warn', {'after': true, 'before': true}], // 关键字前后各有一个空格
        'multiline-ternary': ['warn', 'never'], // 在三元操作数中间换行
        'func-style': ['warn', 'declaration', { 'allowArrowFunctions': true }],
        'space-unary-ops': ['warn', {'words': true, 'nonwords': false}],

        // 错误
        'no-whitespace-before-property': 'error', // 获取对象属性前不能有空格
        'no-extend-native': 'error', // 禁止扩展原生对象
        'no-undef-init': 'error', // 不能把变量初始化成undifined
        'func-call-spacing': ['error', 'never'], // 在函数标识符和其调用之间有空格
        'no-empty-function': 'error', // 不能有空函数
        'no-buffer-constructor': 'error', // 不能有 Buffer 构造
        'no-var': 2, // 不使用var
        'brace-style': [2, '1tbs', { 'allowSingleLine': true }], // if while function 后面的{必须与if在同一行，
        'space-infix-ops': ['error', { 'int32Hint': true }],
        'no-new-object': 2, // 不允许new Object()
        'no-array-constructor': 2, // 不允许使用new Array()创建数组
        'no-multi-assign': 2, // 不允许一次声明多个变量
        'no-constant-condition': 2, // 不允许常量进行判断
        eqeqeq: [2, 'always'], // 必须使用 ===
        'no-debugger': 2, //  程序中不能出现debugger
        'no-dupe-args': 2, //  函数的参数名称不能重复
        'no-dupe-keys': 2, //  对象的属性名称不能重复
        'no-duplicate-case': 2, //  switch的case不能重复
        'no-func-assign': 2, // 不能把函数直接指定另外一个变量
        'no-obj-calls': 2, // 不准使用objec call
        'no-undefined': 2, // 不能使用 undefined
        'no-regex-spaces': 2, // 正则表达式的空格
        'no-sparse-arrays': 2, // 不允许占位数组
        'no-unexpected-multiline': 2, // 不允许无预期的多行
        'no-unreachable': 2, // 已经return后的语句
        'use-isnan': 2, // 使用NAN判断
        'valid-typeof': 2, // 无效的类型
        'no-caller': 2, // 不准使用call
        'no-eval': 2, // 不准使用eval
        'no-redeclare': 2, // 重复声明
        'no-undef': 2, // 没有定义的变量
        'no-use-before-define': 2, // 不能声明前使用
        'no-const-assign': 2, // 不能给常量赋值
        'no-dupe-class-members': 2, // 重复的类成员
        'no-unneeded-ternary': 2, // 禁止不必要的嵌套
    },
};
