//PARTE DE CREANDO API REST
const db = require('../config/config');// se importala variable donde se encuetra lojada la base de datos, la cual nos sirve para realizar las sentencias SQL

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

//creamos un nuevo usuario en la base de datos
Usuario.create = (usuario)=>{
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
        disponible,
        session_token,
        creacion_fecha,
        update_fecha

     )
     VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURING cedula
    `;
    return db.oneOrNone(sql, [
        usuario.cedula,
        usuario.email,
        usuario.nombre,
        usuario.apellido,
        usuario.telefono,
        usuario.imagen,
        usuario.password,
        usuario.disponible,
        new Date(),
        new Date()

    ])

}
 
module.exports = Usuario;