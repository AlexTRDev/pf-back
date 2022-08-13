const { Usuario } = require('../../conexion/db')

const { validarAdministrador } = require('./adminMiddleware')

/*
  Ejemplo de body en PUT request

  {
    "datos": {
    "rol": "operador",
    ...
  }

*/

const todosLosUsuarios = async (req, res, next) => {
  try {
    await validarAdministrador(req, res)
    const usuarios = await Usuario.findAll()
    if (!usuarios.length)
      return res.status(404).json({ msg: 'Usuarios no encontrados' })
    return res.status(200).json({ usuarios })
  } catch (error) {
    next(error)
  }
}

const actualizarUsuario = async (req, res, next) => {
  const { id } = req.params
  const reqBody = req.body.datos

  try {
    await validarAdministrador(req, res)

    if (!id) return res.status(400).json({ msg: 'Id no provisto' })
    if (!reqBody) return res.status(400).json({ msg: 'Datos no provistos' })

    const usuarioEnDb = await Usuario.findByPk(id)

    if (!usuarioEnDb)
      return res.status(404).json({ msg: 'Usuario no encontrado' })

    const usuario = await usuarioEnDb.update({
      email: reqBody.email || usuarioEnDb.email,
      nickname: reqBody.nickname || usuarioEnDb.nickname,
      platform: reqBody.platform || usuarioEnDb.platform,
      password: reqBody.password || usuarioEnDb.password,
      rol: reqBody.rol || usuarioEnDb.rol,
      telefono: reqBody.telefono || usuarioEnDb.telefono,
      picture: reqBody.picture || usuarioEnDb.picture,
      name: reqBody.name || usuarioEnDb.name,
      pais: reqBody.pais || usuarioEnDb.pais,
      ciudad: reqBody.ciudad || usuarioEnDb.ciudad,
      isBan: reqBody.isBan || usuarioEnDb.isBan,
    })

    if (!updatedUsuario)
      return res.status(400).json({ msg: 'No se pudo actualizar el usuario' })

    res.status(200).json({ usuario, msg: 'Usuario actualizado' })
  } catch (error) {
    next(error)
  }
}

const actualizarEstadoDeUsuario = async (req, res, next) => {
  const { id } = req.params
  const reqBody = req.body.datos

  try {
    await validarAdministrador(req, res)

    if (!id) return res.status(400).json({ msg: 'Id no provisto' })
    if (!reqBody) return res.status(400).json({ msg: 'Datos no provistos' })

    const usuarioEnDb = await Usuario.findByPk(id)

    if (!usuarioEnDb)
      return res.status(404).json({ msg: 'Usuario no encontrado' })

    const estadoDeUsuario = await usuarioEnDb.update({
      isBan: reqBody.isBan || usuarioEnDb.isBan,
    })

    if (!estadoDeUsuario)
      return res
        .status(400)
        .json({ msg: 'No se pudo actualizar el estado del usuario' })

    res
      .status(200)
      .json({ usuario: estadoDeUsuario, msg: 'Estado de usuario actualizado' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  todosLosUsuarios,
  actualizarUsuario,
  actualizarEstadoDeUsuario,
}
