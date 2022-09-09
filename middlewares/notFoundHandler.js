const {
    error
} = require('../helpers/apiResponse')

const notFound = (req, res, next) => {
    res.status(404).json(error(`Request Not Found 😢 - ${req.originalUrl}`, 404))
}

module.exports = notFound