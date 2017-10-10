var path = require('path');
var projectConfig = require('./project.config');
// var filenameFormat = projectConfig.hash ? 'app.js?ts=[chunkhash]' : 'app.[chunkhash].js';
var chunkFilenameFormat = projectConfig.hash ? 'app.js?ts=[chunkhash]' :  'app.[chunkhash].js';
// var cssFilenameFormat = projectConfig.hash ? 'css/[name].css?ts=[contenthash]' : 'css/[name].[contenthash].css';


var Conf = {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '.',
    assetsPublicPath: '.',
    chunkFilenameFormat: chunkFilenameFormat,
    env: 'dev',
    port: projectConfig.port,
    proxyTable: {}
}

module.exports = Conf;