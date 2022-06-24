//PARTE DE CREANDO API REST
const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');     
const keys = require('../config/keys');     
const storage = require('../utils/cloud_storage');

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
    
    async validateCI(req, res, next){
        try {
            const cedula = req.body.cedula
            const myUser = await Usuario.findByCI(cedula);
           
            console.log(myUser.cedula);
            return res.status(201).json({
                success: true,
                message: 'cedula ya registrada'
            });


        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(401).json({
                success: false,
                message: 'algo malio sal :(',
                error: error
            });
            
        }


    },

    async register(req, res, next){
        try{
             // Comprobar que el email no se repita
             const email = req.body.email;
             const myUser = await Usuario.findByEmail(email);
 
             if (!myUser) 
             {
             }
             else 
             {
                 return res.status(401).json({
                     success: false,
                     message: 'El email ya se encuentra registrado'
                 });
             } 

            const usuario= req.body;//captura parametros del body postman
            const data = await Usuario.create(usuario);// metodo create q recibe un usuario
            
            console.log('DATA ID');
            console.log(data.id);
            await Rol.create(data.id, 1);  //ROL POR DEFECTO, CLIENTE

            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente, puede iniciar sesión',//mensaje de confirmacion de registro
                data: data.id
            });
        }
        catch (error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al registrar un usuario',//mensaje de error
                error: error
            });
        }
    },

    async registerWithImagen(req, res, next){
        try{
            const usuario = JSON.parse(req.body.usuario);//captura parametros del body postman
            console.log(`Datos enviados del usuario: ${usuario}`);
            const files = req.files;



            if (files.length > 0){
                const pathImage = `image_${Date.now()}`; // Nombre del archivo
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null){
                    usuario.imagen = url;
                }
            }

            const data = await Usuario.create(usuario);// metodo create q recibe un usuario
            
            console.log('DATA ID');
            console.log(data.id);
            await Rol.create(data.id, 1);  //ROL POR DEFECTO, CLIENTE

            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente, puede iniciar sesión',//mensaje de confirmacion de registro
                data: data.id
            });
        }
        catch (error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al registrar un usuario',//mensaje de confirmacion de registro
                error: error
            });
        }
    },

    async login(req, res, next){
        try{
            const email = req.body.email;// lo que requiere para la autenticacion
            const password = req.body.password;

            const myUser = await Usuario.findByEmail(email);

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            if (Usuario.isPasswordMatched(password, myUser.password)) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
                    // expiresIn: (60*60*24) // 1 HORA
                });
                const data = {
                    id: myUser.id,
                    cedula: myUser.cedula,
                    nombre: myUser.nombre,
                    apellido: myUser.apellido,
                    email: myUser.email,
                    telefono: myUser.telefono,
                    imagen: myUser.imagen,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                 console.log(`USUARIO ENVIADO: ${data}`);

                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'El usuario ha sido autenticado'
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                });
            }
        }
        catch (error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al loguearse',//mensaje de confirmacion de registro
                error: error
            });
        }
    }
};
//res se uriliza para retornar un resultado o respuesta al cliente
//201 exito
//501 error