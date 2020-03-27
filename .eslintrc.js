module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'eslint:recommended',
        // 'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:react/recommended',
        'plugin:jsx-control-statements/recommended',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'prettier/react'
    ],
    "settings": {
        "react": {
            "version": "detect",
        }
    },
    plugins: ['@typescript-eslint', 'react', 'jsx-control-statements', 'prettier', '@typescript-eslint/eslint-plugin', 'import', 'eslint-comments', 'react-hooks'],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        'jsx-control-statements/jsx-control-statements': true
    },
    "parserOptions": {
        "project": "tsconfig.json",
        "ecmaFeatures": {
            "legacyDecorators": true
        }
    },
    rules: {
        'react/prop-types': [1, { "ignore": ["children"] }],
        'func-call-spacing': 'off',
        'no-extra-parens': 'off',
        'no-magic-numbers': 'off',
        'no-unused-vars': 'off',
        'semi': 'off',
        'react/sort-comp': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/interface-name-prefix': ['error', 'always'],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        'jsx-control-statements/jsx-use-if-tag': 'off',
        // 允许驼峰
        '@typescript-eslint/camelcase': 'off',
        // 不允许定义空接口
        "@typescript-eslint/no-empty-interface": 'warn',
        'react/prop-types': 'off',
        // 导入必须按照字母顺序
        "ordered-imports": false,
        // 必须使用箭头函数
        "only-arrow-functions": false,
        // 不会重新赋值的一定要用const声明
        "prefer-const": 0,
        // class public/private/protected 的属性/方法排序方式
        "member-ordering": false,
        // class默认类型为public
        "member-access": false,
        // 限制单个文件中只能定义一个class
        "max-classes-per-file": 0,
        // 不允许空代码块
        "no-empty": 0,
        // 不允许使用console
        "no-console": 0,
        // 类型断言必须使用 as Type，禁止使用 <Type>
        // <Type> 容易被理解为 jsx
        "no-angle-bracket-type-assertion": true,
        // 对象属性必须按字母顺序书写
        "object-literal-sort-keys": false,
        // JSX中不允许写lambda表达式
        "jsx-no-lambda": false,
        // 限制单个文件中只能定义一个class
        "no-string-literal": false,
        "object-literal-sort-keys": false,
        // Type literal has only a call signature
        "callable-types": false,
        // 不允许使用var module = require("module"), 用 import foo = require('foo')导入
        "no-var-requires": false,
        // 类型声明的冒号之前是否需要空格
        "typedef-whitespace": false,
        // 行尾不允许有空格
        "no-trailing-whitespace": true,
        // 单行注释格式化规则
        "comment-format": [
            true,
            "check-space"
        ],
        // 禁止无用的表达式
        "no-unused-expression": true,
        // 禁止使用 var
        "no-var-keyword": true,
        // 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        "triple-equals": true,
        // 禁止在分支条件判断中有赋值操作
        "no-conditional-assignment": true,
        // 禁止使用 new 来生成 String, Number 或 Boolean
        "no-construct": true,
        // 禁止 super 在一个构造函数中出现两次
        "no-duplicate-super": true,
        // 禁止在 switch 语句中出现重复测试表达式的 case
        "no-duplicate-switch-case": true,
        // 禁止出现重复的变量定义或函数参数名
        "no-duplicate-variable": [
            true,
            "check-parameters"
        ],
        // 禁止使用 eval
        "no-eval": 2,
        // switch 的 case 必须 return 或 break
        "no-switch-case-fall-through": true,
        // 使用 { ...foo, bar: 1 } 代替 Object.assign({}, foo, { bar: 1 })
        // 前者的类型检查更完善
        "prefer-object-spread": 1,
        "@typescript-eslint/indent": [
            2,
            4,
            {
                'SwitchCase': 1,
                'flatTernaryExpressions': false
            }
        ],
        // 禁止出现重复的 import
        "no-duplicate-imports": 2,
        // 文件类型必须时 utf-8
        "encoding": true,
        // import 语句中，关键字之间的间距必须是一个空格
        "import-spacing": true,
        // new 后面只必须有一个空格
        "new-parens": 2,
        // 禁止连续超过三行空行
        "no-multiple-empty-lines":['error', {
            max: 2
        }],
        // 禁止使用特殊空白符（比如全角空格）
        "no-irregular-whitespace": 2,
        // 禁止变量定义时赋值为 undefined
        "no-unnecessary-initializer": true,
        // catch必须和try的}一行……
        "one-line": [
            true,
            "check-catch",
            "check-finally",
            "check-else"
        ],
        // if 后面必须有 {，除非是单行 if
        "curly": 2,
        // 函数名前必须有空格
        "space-before-function-paren": 'off',
        // 禁止 finally 内出现 return, continue, break, throw 等
        // finally 会比 catch 先执行
        "no-unsafe-finally": 2,
        // 不允许导入子模块
        "no-submodule-imports": false,
        // 解决@作为跟路径来导入模块
        "no-implicit-dependencies": false,
        // 偏向使用条件表达式
        "prefer-conditional-expression": false,
        // 垂直对齐
        "align": [
            true,
            "parameters",
            "statements",
            "members"
        ],
        // prefer x + 1 over 1 + x.
        "binary-expression-operand-order": true,
        // 建议将 () => { return x; } 转换为 () => x.
        "arrow-return-shorthand": [
            true,
            "multiline"
        ],
        // 接口和类型大驼峰
        "class-name": true,
        // jsx对齐方式
        "jsx-alignment": true,
        // jsx属性赋值的=号前后是否有空格
        "jsx-equals-spacing": "never",
        // jsx自闭性 <Button />
        "jsx-self-close": true,
        // jsx自闭的/前需要有空格
        "jsx-space-before-trailing-slash": true,
        "eofline": true,
        "forin": true,
        "no-debugger": 'error',
        "no-multi-spaces": 2,
        "use-isnan": 2,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    }
};