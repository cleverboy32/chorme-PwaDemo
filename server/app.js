var express = require('express');
var path = require('path');
var logger = require('morgan');
var history = require('connect-history-api-fallback');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engines = require('consolidate');
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('../build/webpack.dev.conf')
// var logger = require('./log/logger.js')

var index = require('./routes/index');
var users = require('./routes/users');

var config = require('../config')
var proxyTable = config.dev.proxyTable

var app = express();

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(history({verbose: true}))

if (app.get('env') === 'development') {
    console.log('envvvvvvvvvvv');
    var compiler = webpack(webpackConfig); // 调用webpack并把配置传递过去

    // 使用 webpack-dev-middleware 中间件
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: '/',
        stats: {
            colors: true,
            chunks: false
        }
    });

    app.use(devMiddleware);
    app.use(require('webpack-hot-middleware')(compiler));
} else {
    app.use(express.static(path.join(__dirname, 'output')));
}

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger());
app.use(bodyParser.json());// 解析传入的中间件请求主体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine('html', engines.hogan);
app.set('view engine', 'html');

// 使用路由服务
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log('4044444444');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    console.log('errrrrrrrrrror');
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
