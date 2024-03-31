const Licenses = require('../models/licenses.js')

const controller = {}

// ----- Save License -----
controller.renewLicense = async (req, res) => {
  try {
    const data = { email_boss , time_activation } = req.body

    let licenses = await Licenses.verifyLicense(data)

    if (licenses.code == 404)
      res
        .status(500)
        .json({ message: "License not found", status: false , code: 500})

    else if (licenses.code == 200) {
      register = await Licenses.renewLicense(data)
      console.log(register)
      res.status(register.code).json(register)
    }

  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

// ----- Deactivate License -----
controller.deactivateLicenses = async (req, res) => {
  try {
    const data = { id_license } = req.body

    save = await Licenses.deactivateLicense(data)
    res.status(save.code).json(save)
  
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

// ----- Activate License -----
controller.activateLicenses = async (req, res) => {
  try {
    const data = { id_license } = req.body

    save = await Licenses.activateLicense(data)
    res.status(save.code).json(save)
  
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

module.exports = controller
