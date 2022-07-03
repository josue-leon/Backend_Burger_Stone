const db = require('../config/config');
const Producto = {};
//Consulta Sql para ver los productos dentro de una categoría
Producto.findByCategory = (id_categoria) => {
    const sql = `
SELECT
    P.id,
    P.nombre,
    P.descripcion,
    P.precio,
    P.imagen1,
    P.imagen2,
    P.imagen3,
    P.id_categoria
FROM 
    producto AS P
INNER JOIN
    categorias AS C
ON
    P.id_categoria = C.id
WHERE
    C.id = $1
`;
 
return db.manyOrNone(sql, id_categoria);
}

Producto.create = (producto) => {
    const sql = `
    INSERT INTO
    producto(
        nombre,
        descripcion,
        precio,
        imagen1,
        imagen2,
        imagen3,
        id_categoria,
        creacion_fecha,
        update_fecha
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `;
    return db.oneOrNone(sql, [
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.imagen1,
        producto.imagen2,
        producto.imagen3,
        producto.id_categoria,
        new Date(),
        new Date()
    ])
}

// Almacenar más imágenes
Producto.update = (producto) => {
    const sql = `
    UPDATE
        producto
    SET
        nombre = $2,
        descripcion = $3,
        precio = $4,
        imagen1 = $5,
        imagen2 = $6,
        imagen3 = $7,
        id_categoria = $8,
        update_fecha = $9
    WHERE
        id = $1
    `;
    return db.none(sql, [
        producto.id,
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.imagen1,
        producto.imagen2,
        producto.imagen3,
        producto.id_categoria,
        new Date()
    ]);
}

module.exports = Producto;