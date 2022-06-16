//PARTE DE CREANDO API REST
const Usuario = require('../models/usuario');

module.exports = {

    async getAll(req, res, next){
        try {
            const data = await Usuario.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    }
};