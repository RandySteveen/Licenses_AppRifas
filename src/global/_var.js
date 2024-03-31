require('dotenv').config()

/* ----------- SERVER ----------- */
const PORT                      = process.env.PORT

/* ----------- DATABASE ----------- */
const PG_HOST                   = process.env._HOST
const PG_USER                   = process.env._USER
const PG_PASS                   = process.env._PASS
const PG_NAME                   = process.env._NAME

/* ----------- ROUTES ----------- */

// Users
const GET_LICENSES              = process.env.GET_LICENSES
const DEACTIVATE_LICENSES       = process.env.DEACTIVATE_LICENSES
const ACTIVATE_LICENSES       = process.env.ACTIVATE_LICENSES
const RENEW_LICENSES            = process.env.RENEW_LICENSES
const KEY                       = process.env.KEY

module.exports = {
	// Server
  PORT,
  // Database
  PG_HOST, PG_USER, PG_PASS, PG_NAME,
  // Sellers
  GET_LICENSES, RENEW_LICENSES , ACTIVATE_LICENSES , DEACTIVATE_LICENSES , KEY
 }
