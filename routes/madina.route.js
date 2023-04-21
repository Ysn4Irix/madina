const router = require('express').Router()

const {
	alive,
	getAllCities,
	getAllDistrictsByCityId,
	getAllDistrictsByCityName
} = require('../controllers/madina.controller')

/* check api is alive */
router.get('/alive', alive)

/* Get all cities*/
router.get('/cities', getAllCities)

/* Get all districts by a city Id*/
router.get('/districts/:id', getAllDistrictsByCityId)

/* Get all districts by a city name*/
router.get('/districts', getAllDistrictsByCityName)

module.exports = router
