const { createLogger, format, transports } = require('winston');

const env = process.env.NODE_ENV || 'development';

const options = {
  /* console options, add additional one for file if required */
  console: {
    handleExceptions: true,
    format: format.combine(
      format.json(),
      format.colorize(),
      format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    ),
  },
};

const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [new transports.Console(options.console)],
  exitOnError: false,
});

module.exports = logger;
