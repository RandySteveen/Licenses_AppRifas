const pool      = require('../utils/mysql.connect.js') 
const { KEY }   = require('../global/_var.js')
const jwt       = require("jsonwebtoken")

// ----- Verify License -----
const verifyLicense = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "License not found",
      code: 404
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_boss FROM chiefs WHERE email = ? ;`
    let [verify] = await connection.execute(sql,[email_boss])

    if (verify.length > 0) {
      let id = verify[0].id_boss

      let sql = `SELECT id_license FROM licenses WHERE id_boss = ? ;`
      let [license] = await connection.execute(sql,[id])
  
      if (license.length > 0) {
        msg = {
          status: true,
          message: "License found",
          data: license,
          code: 200
        }
      }
    }

    connection.release()

    return msg
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Save License -----
const renewLicense = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "License not registered",
      code: 500
    }
    
    const connection = await pool.getConnection()

    const fechaActual = new Date();
    const date_created = fechaActual.toISOString().split('T')[0];

    // Calcula la fecha de expiración sumando 'time_activation' días a la fecha actual
    const expirationDate = new Date(fechaActual.getTime() + time_activation * 24 * 60 * 60 * 1000);
    const expiration_date = expirationDate.toISOString().split('T')[0]; // Formatea la fecha de expiración a 'yyyy-MM-dd'

    let license = {
      emailAdmin: email_boss,
      timeLicense: time_activation,
      date_create: date_created,
      date_expires: expiration_date
    }

    console.log(license)

    const token = jwt.sign(license , KEY, { algorithm: "HS256" })

    let sqlSearch = `SELECT id_boss FROM chiefs WHERE email = ? ;`
    const [result] = await connection.execute(sqlSearch,[email_boss])

    if(result.length > 0){

      let id = result[0].id_boss

      let sql = `UPDATE licenses SET license = ? WHERE id_boss = ?;`
      const [save] = await connection.execute(sql, [token , id]);    
      
      if (save.affectedRows  > 0) {
        msg = {
          status: true,
          message: "License renew succesfully",
          code: 200,
          license: token
        }
      }
      
      connection.release()

    }


    return msg

  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Get License -----
const getLicense = async () => {
  try {
    let msg = {
      status: false,
      message: "Licenses not found",
      code: 404
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_license , id_boss , license , activation_status , date_created FROM licenses ;`
    let [search] = await connection.execute(sql)

    // let lic = search[0].license

    // // Verificar y decodificar el token
    // jwt.verify(lic, KEY , (err, decoded) => {
    //   if (err) {
    //     console.error('Error al verificar el token:', err);
    //     // Manejar el error aquí
    //   } else {
    //     console.log('Token decodificado:', decoded)
    //   }
    // })


    if (search.length > 0) {
      msg = {
        status: true,
        message: "Licenses found",
        data: search,
        code: 200
      }
    }

    connection.release()

    return msg
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Activate License -----
const activateLicense = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "License not activated",
      code: 500
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_license , id_boss FROM licenses WHERE id_license = ? ;`
    let [verify] = await connection.execute(sql,[id_license])

    if (verify.length > 0) {

      let boss = verify[0].id_boss

      let updateSql = `UPDATE licenses SET activation_status = ? WHERE id_license = ?;`;
      const updated = await connection.execute(updateSql, [ 1 , id_license]);

      let updateBoss = `UPDATE chiefs SET activation_status = ? WHERE id_boss = ?;`;
      await connection.execute(updateBoss, [ 1 , boss]);

      let updateSeller = `UPDATE sellers SET activation_status = ? WHERE id_boss = ?;`;
      await connection.execute(updateSeller, [ 1 , boss]);


      if (updated.length > 0  ) {
        msg = {
          status: true,
          message: "License successfully renewed",
          code: 200
        }
      }
    }

    connection.release()

    return msg

  } catch (err) {
    console.log(err)
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Deactivate License -----
const deactivateLicense = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "License not activated",
      code: 500
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_license , id_boss FROM licenses WHERE id_license = ? ;`
    let [verify] = await connection.execute(sql,[id_license])

    if (verify.length > 0) {
    
      let boss = verify[0].id_boss

      let updateSql = `UPDATE licenses SET activation_status = ? WHERE id_license = ?;`
      const updated = await connection.execute(updateSql, [0 , id_license])

      let updateBoss = `UPDATE chiefs SET activation_status = ? WHERE id_boss = ?;`;
      await connection.execute(updateBoss, [ 0 , boss]);

      let updateSeller = `UPDATE sellers SET activation_status = ? WHERE id_boss = ?;`;
      await connection.execute(updateSeller, [ 0 , boss]);


      if (updated.length > 0 ) {
        msg = {
          status: true,
          message: "License Disabled succesfully",
          code: 200
        }
      }
    }

    connection.release()

    return msg

  } catch (err) {
    console.log(err)
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

module.exports = {
  getLicense,
  verifyLicense,
  renewLicense,
  activateLicense,
  deactivateLicense
}
