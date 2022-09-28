const logger = require('signale')

logger.config({
	displayFilename: false,
	displayTimestamp: true,
	displayBadge: false,
	displayDate: false
})

module.exports = logger
