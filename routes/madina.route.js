const router = require('express').Router()

const {
	alive,
	getAllCities,
	getAllDistrictsByCityId
} = require('../controllers/madina.controller')

/* check api is alive */
router.get('/alive', alive)

/* Get all cities*/
router.get('/cities', getAllCities)

/* Get all districts by a city*/
router.get('/districts/:id', getAllDistrictsByCityId)

module.exports = router
