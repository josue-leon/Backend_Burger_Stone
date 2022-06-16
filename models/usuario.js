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
 
module.exports = Usuario;