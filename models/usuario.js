//PARTE DE CREANDO API REST
const db = require('../config/config');// se importala variable donde se encuetra lojada la base de datos, la cual nos sirve para realizar las sentencias SQL
const crypto = require('crypto');

const { userInfo } = require('os');

const Usuario = {};

Usuario.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        usuario
    `;

    return db.manyOrNone(sql);//metodo para obtener datos a la bd
}

Usuario.findById = (id, callback) => {
    const sql = `
    SELECT
        id,
        cedula,    
        email,
        nombre,
        apellido,
        telefono,
        imagen,
        password,
        session_token
    FROM
        usuario
    WHERE
        id = $1`;

    return db.oneOrNone(sql, id).then(user => {callback(null, user); })
}

Usuario.findByEmail = (email) => {
    const sql = `
SELECT
        U.id,
        U.cedula,    
        U.email,
        U.nombre,
        U.apellido,
        U.telefono,
        U.imagen,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id', R.id,
                'nombre', R.nombre,
                'imagen', R.imagen,
                'ruta',   R.ruta
            )
        ) AS roles
    FROM
        usuario AS U
    INNER JOIN
        usuarioroles AS UHR
    ON
        UHR.id_usuario = U.id
    INNER JOIN 
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.email = $1
    GROUP BY 
        U.id  
    `;
    return db.oneOrNone(sql, email);
}
//creamos un nuevo usuario en la base de datos
Usuario.create = (usuario)=>{

    const myPasswordHashed = crypto.createHash('md5').update(usuario.password).digest('hex');
    usuario.password = myPasswordHashed;

    const sql =`
     INSERT INTO
     usuario(
        cedula,    
        email,
        nombre,
        apellido,
        telefono,
        imagen,
        password,
        creacion_fecha,
        update_fecha
     )
     VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `;
    return db.oneOrNone(sql, [
        usuario.cedula,
        usuario.email,
        usuario.nombre,
        usuario.apellido,
        usuario.telefono,
        usuario.imagen,
        usuario.password,
        new Date(),
        new Date()
    ])
}

Usuario.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = Usuario;