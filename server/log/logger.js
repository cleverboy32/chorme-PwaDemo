let winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: '../../logs/pwa.info.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: './../logs/pwa.error.log',
            level: 'error'
        })
    ]
});

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

exports.logger = logger;
