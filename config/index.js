var path = require('path');
var projectConfig = require('./project.config');
// var filenameFormat = projectConfig.hash ? 'app.js?ts=[chunkhash]' : 'app.[chunkhash].js';
var chunkFilenameFormat = projectConfig.hash ? 'app.js?ts=[chunkhash]' :  'app.[chunkhash].js';
// var cssFilenameFormat = projectConfig.hash ? 'css/[name].css?ts=[contenthash]' : 'css/[name].[contenthash].css';

module.exports = {
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        chunkFilenameFormat: chunkFilenameFormat,
        env: 'dev',
        port: projectConfig.port,
        proxyTable: {}
    },
    dev: {
        env: require('./dev.conf'),
        autoOpenBrowser: false,
        assetsPublicPath: '/',
        assetsSubDirectory: 'static',
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}