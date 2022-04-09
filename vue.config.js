const {defineConfig} = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


const isProduction = process.env.NODE_ENV !== 'development';
module.exports = defineConfig({
    transpileDependencies: true,
    productionSourceMap: false,
    configureWebpack: config => {
        // 生产环境相关配置
        if (isProduction) {
            // gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path][base].gz',
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ),
                    threshold: 10240,
                    minRatio: 0.9,
                    deleteOriginalAssets: true
                })
            )
        }
        // 启用element-plus按需导入
        config.plugins.push(
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
        )
        config.plugins.push(
            Components({
                resolvers: [ElementPlusResolver()]
            })
        )
    },
})
