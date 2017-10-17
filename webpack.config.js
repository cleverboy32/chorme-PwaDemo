var webpack = require('webpack'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./config');
const cleanWebpackPlugin = require('clean-webpack-plugin')
var path = require('path');
var vueLoaderConfig = require('./build/vue-loader.conf')
var utils = require('./build/utils')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

var Configrue = {
    context: path.join(__dirname, '/'),
    entry: {
        index: './main.js',
        app: './scripts/app.js',
        prodServiceWorker: './prod-service-worker.js',
        serviceWorker: './service-worker.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    devServer: {
        port: 8090,
        hot: true,
        quiet: true,
        compress: true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://lorempixel.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
                // options: {
                //     loaders: {
                //         css: ExtractTextPlugin.extract({
                //             use: ['css-loader'],
                //             fallback: 'vue-style-loader' 
                //         }),
                //         less: ExtractTextPlugin.extract({
                //             use: ['less-loader'],
                //             fallback: 'vue-style-loader' 
                //         })
                //         //....scss less sass more
                //     },
                //     sourceMap:true
                // }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract([ 'css-loader', 'postcss-loader' ])
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
            }
        ]
    },
    plugins: [
        // new cleanWebpackPlugin(['dist']),
        
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
            chunksSortMode: 'manual',
            chunks: ['index', 'app'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = Configrue;