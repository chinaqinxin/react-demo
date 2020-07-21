const { override,fixBabelImports,addLessLoader,addDecoratorsLegacy } = require('customize-cra')
// 主题定义
const modifyVars = require('./lessVars')

module.exports = override(
    fixBabelImports(
        'import',{
            libraryName:'antd',
            libraryDirectory:'es',
            // style:'css'
            style:true

        }),
        // addDecoratorsLegacy装饰器模式的方法
        addDecoratorsLegacy(),
        addLessLoader({
            javascriptEnabled:true,
            // 更改主题颜色
            modifyVars
        })
)