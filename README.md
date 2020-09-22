# React-Base &middot; [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


该脚手架基于`create-react-app`，集成有以下框架/库：
* `React`
* `Dva`
* `Eslint`
* `prettier`
* `stylelint`
* `husky`
* `Andt`
* `Typescript`
* `less/scss`

## 开发、部署命令
### 开发
启动命令：
```js
npm run dev
```

### 构建
构建命令：
```js
npm run build
```
### 部署
将构建好的文件部署到线上环境，部署方式可以通过jenkins或者docker进行部署。

## git commit 规范

### Commit message格式

`<type>: <subject>`

#### type

用于说明 commit 的类别，只允许使用下面7个标识。

- `feat`：新功能（feature）
- `fix`：修补bug
- `docs`：文档（documentation）
- `style`： 格式（不影响代码运行的变动）
- `refactor`：重构（即不是新增功能，也不是修改bug的代码变动）
- `test`：增加测试
- `chore`：构建过程或辅助工具的变动

*如果type为`feat`和`fix`，则该 commit 将肯定出现在 Change log 之中。*


### 代码格式检查及格式化

```javascript
// 检查 less & ts & tsx 文件格式
npm run lint

// 检查 less 文件的代码格式
npm run stylelint
// 修复 less 文件的代码格式
npm run stylelint:fix

// 检查 ts & tsx 文件的代码格式
npm run eslint
// 修复 ts & tsx 文件的代码格式
npm run eslint:fix

// 格式化代码
npm run prettier
```

除了常规的检查、修复、格式化外，在进行git commit的时候会触发hook，检查代码是否经过格式化  
如此一来，便可以保证进入代码库的一定是符合格式的代码校验及格式化检查检查检查
