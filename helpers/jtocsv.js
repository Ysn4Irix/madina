const { json2csvAsync } = require('json-2-csv')

const json2csv = async (data, options) => {
	return await json2csvAsync(data, options)
}

module.exports = json2csv
