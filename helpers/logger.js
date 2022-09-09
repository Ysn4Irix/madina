const { createLogger, format, transports } = require('winston')
const { join } = require('path')

const logger = createLogger({
	level: 'error',
	transports: [
		new transports.File({
			filename: join(__dirname, '../log/errors.log'),
			level: 'error',
			format: format.combine(format.timestamp(), format.json())
		})
	]
})

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: format.combine(format.timestamp(), format.simple())
		})
	)
}

module.exports = logger
