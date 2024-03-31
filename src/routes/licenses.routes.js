const { GET_LICENSES , RENEW_LICENSES , ACTIVATE_LICENSES , DEACTIVATE_LICENSES } = require('../global/_var.js')

// Dependencies
const express = require('express')
const router = express.Router()

// Controllers
const dataController = require('../controllers/getInfo.controller.js')
const saveController = require('../controllers/saveInfo.controller.js')

// Routes
router.get(GET_LICENSES , dataController.getLicenses)

router.post(RENEW_LICENSES , saveController.renewLicense)

router.post(DEACTIVATE_LICENSES , saveController.deactivateLicenses)

router.post(ACTIVATE_LICENSES , saveController.activateLicenses)

module.exports = router
