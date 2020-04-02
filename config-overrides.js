const { override, addLessLoader, fixBabelImports, addWebpackAlias, addDecoratorsLegacy, useEslintRc, addWebpackPlugin, useBabelRc, overrideDevServer } = require('customize-cra');
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const HappyPack = require('happypack');

/**
 * 生产环境取消map
 */
if(process.env.NODE_ENV === 'production') process.env.GENERATE_SOURCEMAP = "false";
const rewiredMap = () => config => {
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
    const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    loaders[5].use.push({
        loader: 'sass-resources-loader',
        options: {
            resources: path.resolve(__dirname, 'src/styles/index.scss')
        }
    })
    return config;
};

/**
 * 代理
 */
const addProxy = proxy => config => {
    config.proxy = proxy;
    return config;
}
/**
 * 开启gzip压缩,需要后端配合
 */
const Compression = new CompressionPlugin({
    filename: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.ts$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
})


/**
 * 创建 happypack 共享进程池，其中包含 6 个子进程
 */
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });
/**
 * HappyPack插件
 */
const HappyPackPlugin = new HappyPack({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory'],
    threadPool: happyThreadPool
})

module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        rewiredMap(),
        addDecoratorsLegacy(),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: {
                "@primary-color": '#2483ff'
            }
        }),
        useEslintRc(),
        useBabelRc(),
        addWebpackPlugin(HappyPackPlugin),
        // addWebpackPlugin(Compression),
        /**打包文件大小分析插件 */
        // addWebpackPlugin(new BundleAnalyzerPlugin()),
        addWebpackAlias({
            ["@"]: path.resolve(__dirname, "src"),
            ["assets"]: path.resolve(__dirname, "src/assets"),
            ["components"]: path.resolve(__dirname, "src/components"),
            ["config"]: path.resolve(__dirname, "src/config"),
            ["models"]: path.resolve(__dirname, "src/models"),
            ["utils"]: path.resolve(__dirname, "src/utils"),
            ["styles"]: path.resolve(__dirname, "src/styles"),
            ["api"]: path.resolve(__dirname, "src/api"),
            ["services"]: path.resolve(__dirname, "src/services"),
            ["pages"]: path.resolve(__dirname, "src/pages"),
            ["schema"]: path.resolve(__dirname, "src/schema"),
            ["hooks"]: path.resolve(__dirname, "src/hooks"),
        }),
    ),
    devServer: overrideDevServer(
        addProxy({
            '/api': {
                target: 'https://cityview.cityworks.cn/api/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        })
    )
};
