const db = require('../config/config');
const Orden = {};

Orden.findByStatus = (status) => {

    const sql = `
    SELECT
        O.id,
        O.id_cliente,
        O.id_direccion,
        O.id_repartidor,
        O.status,
        O.timestamp,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'nombre', U.nombre,
            'apellido', U.apellido,
            'imagen', U.imagen
        ) AS cliente,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'direccion', A.direccion,
            'vecindario', A.vecindario,
            'latitud', A.latitud,
            'longitud', A.longitud
        ) AS direccion
    FROM
        orden AS O
    INNER JOIN
        usuario AS U
    ON
        O.id_cliente = U.id
    INNER JOIN
        direccion AS A
    ON
        A.id = O.id_direccion
    WHERE
        status = $1;
    `;

    return db.manyOrNone(sql, status);
}

Orden.create = (orden) => {
    const sql = `
    INSERT INTO
        orden(
            id_cliente,
            id_direccion,
            status,
            timestamp,
            creacion_fecha,
            update_fecha
        )
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    return db.oneOrNone (sql, [
        orden.id_cliente,
        orden.id_direccion,
        orden.status,
        Date.now(),
        new Date(),
        new Date()
    ]);
}

module.exports = Orden;