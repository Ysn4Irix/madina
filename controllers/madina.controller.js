const uptimeFormat = require('../helpers/upTime')
const { success, error, errCatcher } = require('../helpers/apiResponse')
const logger = require('../helpers/logger')
const pool = require('../helpers/db')
const jtox = require('../helpers/jtox')

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

		const { format } = req.query
		if (!format) return res.status(200).send('😢 Specify your format')

		if (format !== 'xml' && format !== 'json') {
			return res.status(200).send('😢 Invalid format')
		}
		try {
			let data = null

			const sql = 'SELECT * FROM cities ORDER BY name'
			const [rows] = await pool.execute(sql)
			format === 'xml' ? (data = jtox(rows, 'city')) : (data = rows)

			if (format === 'xml') {
				res.set('Content-Type', 'text/xml').status(200).send(data)
			} else {
				res.status(200).json(success('🎉 done', data, res.statusCode))
			}
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

		const { format } = req.query
		if (!format) return res.status(200).send('😢 Specify your format')

		if (format !== 'xml' && format !== 'json') {
			return res.status(200).send('😢 Invalid format')
		}

		try {
			let data = null
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
			format === 'xml' ? (data = jtox(rows, 'district')) : (data = rows)

			if (format === 'xml') {
				res.set('Content-Type', 'text/xml')
				res.status(200).send(data)
			} else {
				res.status(200).json(success('🎉 done', data, res.statusCode))
			}
		} catch (err) {
			errCatcher(logger, res, error, err)
		}
	}
}
