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
		JSON_AGG(
			JSON_BUILD_OBJECT(
				'id', P.id,
				'nombre', P.nombre,
				'descripcion', P.descripcion,
				'precio', P.precio,
				'imagen1', P.imagen1,
				'imagen2', P.imagen2,
				'imagen3', P.imagen3,
				'cantidad', OP.cantidad
			)
		) AS producto,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'nombre', U.nombre,
            'apellido', U.apellido,
            'imagen', U.imagen
        ) AS cliente,
		JSON_BUILD_OBJECT(
            'id', U2.id,
            'nombre', U2.nombre,
            'apellido', U2.apellido,
            'imagen', U2.imagen
        ) AS repartidor,
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
	LEFT JOIN
		usuario AS U2
	ON
		O.id_repartidor = U2.id
    INNER JOIN
        direccion AS A
	ON
        A.id = O.id_direccion
	INNER JOIN
		orden_producto AS OP
	ON
		OP.id_orden = O.id
	INNER JOIN
		producto AS P
	ON
		P.id = OP.id_producto
    WHERE
        status = $1
	GROUP BY
		O.id, U.id, A.id, U2.id
    `;

    return db.manyOrNone(sql,status);
}

Orden.findByDeliveryAndStatus = (id_repartidor, status) => {

    const sql = `
    SELECT
        O.id,
        O.id_cliente,
        O.id_direccion,
        O.id_repartidor,
        O.status,
        O.timestamp,
		JSON_AGG(
			JSON_BUILD_OBJECT(
				'id', P.id,
				'nombre', P.nombre,
				'descripcion', P.descripcion,
				'precio', P.precio,
				'imagen1', P.imagen1,
				'imagen2', P.imagen2,
				'imagen3', P.imagen3,
				'cantidad', OP.cantidad
			)
		) AS producto,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'nombre', U.nombre,
            'apellido', U.apellido,
            'imagen', U.imagen
        ) AS cliente,
		JSON_BUILD_OBJECT(
            'id', U2.id,
            'nombre', U2.nombre,
            'apellido', U2.apellido,
            'imagen', U2.imagen
        ) AS repartidor,
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
	LEFT JOIN
		usuario AS U2
	ON
		O.id_repartidor = U2.id
    INNER JOIN
        direccion AS A
	ON
        A.id = O.id_direccion
	INNER JOIN
		orden_producto AS OP
	ON
		OP.id_orden = O.id
	INNER JOIN
		producto AS P
	ON
		P.id = OP.id_producto
    WHERE
        O.id_repartidor = $1 AND status = $2
	GROUP BY
		O.id, U.id, A.id, U2.id
    `;

    return db.manyOrNone(sql, [id_repartidor, status]);
}

Orden.findByClientAndStatus = (id_cliente, status) => {

    const sql = `
    SELECT
        O.id,
        O.id_cliente,
        O.id_direccion,
        O.id_repartidor,
        O.status,
        O.timestamp,
		JSON_AGG(
			JSON_BUILD_OBJECT(
				'id', P.id,
				'nombre', P.nombre,
				'descripcion', P.descripcion,
				'precio', P.precio,
				'imagen1', P.imagen1,
				'imagen2', P.imagen2,
				'imagen3', P.imagen3,
				'cantidad', OP.cantidad
			)
		) AS producto,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'nombre', U.nombre,
            'apellido', U.apellido,
            'imagen', U.imagen
        ) AS cliente,
		JSON_BUILD_OBJECT(
            'id', U2.id,
            'nombre', U2.nombre,
            'apellido', U2.apellido,
            'imagen', U2.imagen
        ) AS repartidor,
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
	LEFT JOIN
		usuario AS U2
	ON
		O.id_repartidor = U2.id
    INNER JOIN
        direccion AS A
	ON
        A.id = O.id_direccion
	INNER JOIN
		orden_producto AS OP
	ON
		OP.id_orden = O.id
	INNER JOIN
		producto AS P
	ON
		P.id = OP.id_producto
    WHERE
        O.id_cliente = $1 AND status = $2
	GROUP BY
		O.id, U.id, A.id, U2.id
    `;

    return db.manyOrNone(sql, [id_cliente, status]);
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

Orden.update = (orden) => {
    const sql = `
    UPDATE
        orden
    SET
        id_cliente = $2,
        id_direccion = $3,
        id_repartidor = $4,
        status = $5,
        update_fecha = $6
    WHERE
        id = $1
    `;
    return db.none(sql, [
        orden.id,
        orden.id_cliente,
        orden.id_direccion,
        orden.id_repartidor,
        orden.status,
        new Date()
    ]);
}

module.exports = Orden;