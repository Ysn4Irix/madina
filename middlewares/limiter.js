const rateLimit = require('express-rate-limit')

module.exports = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 100,
	message: {
		status: 429,
		response: 'Too many requests from this IP, please try again'
	}
})
