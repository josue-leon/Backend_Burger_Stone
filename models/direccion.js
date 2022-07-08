const db = require('../config/config');
const Direccion = {};

Direccion.findByUser = (id_usuario) => {
    const sql = `
    SELECT
        id,
        id_usuario,
        direccion,
        vecindario,
        latitud,
        longitud
    FROM
        direccion
    WHERE
        id_usuario = $1
    `;

    return db.manyOrNone(sql, id_usuario);
}

Direccion.create = (direccion) => {
    const sql = `
    INSERT INTO
        direccion(
            id_usuario,
            direccion,
            vecindario,
            latitud,
            longitud,
            creacion_fecha,
            update_fecha
        )
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;

    return db.oneOrNone (sql, [
        direccion.id_usuario,
        direccion.direccion,
        direccion.vecindario,
        direccion.latitud,
        direccion.longitud,
        new Date(),
        new Date()
    ]);
}

module.exports = Direccion;