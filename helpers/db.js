const mysql = require('mysql2')
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env

module.exports = mysql
	.createPool({
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME
	})
	.promise()
