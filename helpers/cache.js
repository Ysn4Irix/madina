const NodeCache = require('node-cache')

const Cache = new NodeCache({ stdTTL: 10519200, checkperiod: 120 })

module.exports = {
	setCache: (key, value) => {
		return Cache.set(key, value)
	},
	hasCache: key => {
		return Cache.has(key)
	},
	getCache: key => {
		return Cache.get(key)
	}
}
