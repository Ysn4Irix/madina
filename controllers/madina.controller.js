const uptimeFormat = require('../helpers/upTime')
const { success, error, errCatcher } = require('../helpers/apiResponse')
const logger = require('../helpers/logger')
const pool = require('../helpers/db')
const myCache = require('../helpers/cache')

module.exports = {
	alive: async (req, res) => {
		if (req.method !== 'GET') {
			res.status(403).json(
				error(`${req.method} is not allowed`, res.statusCode)
			)
			return
		}

		try {
			res.status(200).json(
				success("🎉I'm alive", {
					upTime: uptimeFormat(process.uptime())
				})
			)
		} catch (err) {
			errCatcher(logger, res, error, err)
		}
	},
	getAllCities: async (req, res) => {
		if (req.method !== 'GET') {
			res.status(403).json(
				error(`${req.method} is not allowed`, res.statusCode)
			)
			return
		}

		try {
			let data = null
			if (myCache.hasCache('cities')) {
				data = myCache.getCache('cities')
			} else {
				const sql = 'SELECT * FROM cities ORDER BY name'
				const [rows] = await pool.execute(sql)
				myCache.setCache('cities', rows)
				data = rows
			}

			res.status(200).json(success('🎉 done', data, res.statusCode))
		} catch (err) {
			errCatcher(logger, res, error, err)
		}
	},
	getAllDistrictsByCityId: async (req, res) => {
		if (req.method !== 'GET') {
			res.status(403).json(
				error(`${req.method} is not allowed`, res.statusCode)
			)
			return
		}

		const { id } = req.params

		try {
			let data = null
			if (myCache.hasCache(id)) {
				data = myCache.getCache(id)
			} else {
				const sql = `SELECT districts.* FROM districts
				INNER JOIN cities ON
				districts.cityId = cities.code
				WHERE cities.code = ?
				ORDER BY districts.name`

				const [rows] = await pool.execute(sql, [id])
				if (rows.length === 0)
					return res
						.status(400)
						.json(error(`${id} is not a valid Id`, res.statusCode))
				myCache.setCache(id, rows)
				data = rows
			}

			res.status(200).json(success('🎉 done', data, res.statusCode))
		} catch (err) {
			errCatcher(logger, res, error, err)
		}
	}
}
