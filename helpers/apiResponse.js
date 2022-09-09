/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */

const success = (message, results, time, statusCode) => {
	return {
		message,
		error: false,
		code: statusCode,
		results
	}
}

/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */

const error = (message, statusCode) => {
	const codes = [200, 201, 400, 401, 404, 403, 422, 500]

	const codeFinder = codes.find(code => code === statusCode)

	if (!codeFinder) statusCode = 500
	else statusCode = codeFinder

	return {
		message,
		code: statusCode,
		error: true,
		timestamp: new Date()
	}
}

/**
 * @desc    Send any validation response
 *
 * @param   {array} errors
 */

const validation = errors => {
	return {
		message: 'Validation errors',
		error: true,
		code: 422,
		errors
	}
}

/**
 * @desc    Catch any backend errors
 *
 * @param   {Function} logger
 * @param   {Response} res
 * @param   {Function} handler
 * @param   {string} err
 */

const errCatcher = (logger, res, handler, err) => {
	logger.error({
		message: err.message,
		stack: err.stack
	})
	res.status(500).json(
		handler('Oops! We have an problem in our backend 😢', res.statusCode)
	)
}

module.exports = {
	success,
	error,
	validation,
	errCatcher
}
