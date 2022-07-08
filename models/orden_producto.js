const db = require('../config/config');
const OrdenProducto = {};

OrdenProducto.create = (id_orden, id_producto, cantidad) => {
    const sql = `
    INSERT INTO
        orden_producto(
            id_orden,
            id_producto,
            cantidad,
            creacion_fecha,
            update_fecha
        )
    VALUES ($1, $2, $3, $4, $5)
    `;

    return db.none (sql, [
        id_orden,
        id_producto,
        cantidad,
        new Date(),
        new Date()
    ]);
}

module.exports = OrdenProducto;