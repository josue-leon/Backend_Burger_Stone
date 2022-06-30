const db = require('../config/config');
const Categoria = {};

Categoria.create = (categoria) => {
    const sql = `
    INSERT INTO
        categorias(
            nombre,
            descripcion,
            creacion_fecha,
            update_fecha
        )
    VALUES ($1, $2, $3, $4) RETURNING id
    `;
    return db.oneOrNone(sql, [
        categoria.nombre,
        categoria.descripcion,
        new Date(),
        new Date()
    ]);
}

module.exports = Categoria;