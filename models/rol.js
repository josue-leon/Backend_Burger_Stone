const db = require('../config/config');

const Rol = {};

Rol.create = (id_usuario, id_rol) => {
    const sql =  `
    INSERT INTO
        usuarioRoles(
            id_usuario,
            id_rol,
            creacion_fecha,
            update_fecha
        )
    VALUES($1, $2, $3, $4)
    `;
    return db.none(sql, [
        id_usuario, 
        id_rol, 
        new Date(),
        new Date()
    ]);
}
module.exports = Rol;