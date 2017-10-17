var isProduction = process.env.NODE_ENV === 'production'
var utils = require('./utils')
var config = require('../config')

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
        extract: isProduction
    })
}
