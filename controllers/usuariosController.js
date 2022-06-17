//PARTE DE CREANDO API REST
const Usuario = require('../models/usuario');

module.exports = {

    async getAll(req, res, next){
        try {
            const data = await Usuario.getAll();//awaid espera hasta que se ejecuta la consulta para seguir con el siguiente cod
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
    },

    //metodo asincrono
    
    async register(req, res, next){
        try{
            const usuario= req.body;//captura parametros del body postman
            const data = await Usuario.create(usuario);// metodo create q recibe un usuario

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',//mensaje de confirmacion de registro
                data: data.id
            });
        }
        catch (error){
            console.log('Error: $(error)');
            return res.status(501).json({
                success: false,
                message: 'Error al registrar un usuario',//mensaje de confirmacion de registro
                error: error
            })

        }

    }
};
//res se uriliza para retornar un resultado o respuesta al cliente
//201 exito
//501 error