const Licenses = require('../models/licenses.js')

const controller = {}

controller.getLicenses = async (req, res) => {
  try {
    const lic  = await Licenses.getLicense()
    res.status(lic.code).json(lic)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

module.exports = controller
