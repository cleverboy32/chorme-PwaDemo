var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var GenerateAssetPlugin = require('generate-asset-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

// 这就是那个manifestJson
var manifestJson = function(compilation) {
    console.log(JSON.stringify(compilation.assets['imgs/48.png']));
    let manifest = {
        short_name: "pwa",
        name: "pwa - demo",
        icons: [
            {
                src: "./imgs/48.png",
                type: "image/png",
                sizes: "48x48"
            },
            {
                src: "./imgs/96.png",
                type: "image/png",
                sizes: "96x96"
            },
            {
                src: "./imgs/192.png",
                type: "image/png",
                sizes: "192x192"
            }
        ],
        background_color: "#2196F3",
        theme_color: "#2196F3",
        display: "standalone",
        start_url: "index.html?launcher=true"
    }

    return JSON.stringify(manifest);
};

module.exports = {
    entry: {
        index: './src/main.js',
        app: './scripts/app.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 0,
                    name: utils.assetsPath('img/[name]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: 'imgs',
                to: 'img'
            },
            {
                from: 'manifest.json',
                to: 'manifest.json'
            }
        ])
    ]
}
function newFunction() {
    return './imgs';
}

