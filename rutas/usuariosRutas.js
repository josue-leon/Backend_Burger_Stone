//vamos a ejecutar las rutas para ejecutar los metodos// PARTE DE CREANDO API REST
const UsuariosController = require('../controllers/usuariosController');


module.exports = (app, upload) => {
    //traer datos
    app.get('/BurgerStone/usuario/getAll', UsuariosController.getAll);//para crear una nueva ruta
    app.get('/BurgerStone/usuario/findById/:id', UsuariosController.findById); // El parámetro que se captura es id con /:id
    app.get('/BurgerStone/usuario/validateCI',UsuariosController.validateCI);// validar si la cedula existe 

    //guardar datos
    app.post('/BurgerStone/usuario/create', upload.array('image', 1), UsuariosController.registerWithImagen);
    app.post('/BurgerStone/usuario/login',UsuariosController.login);

    // Actualizar datos
    app.put('/BurgerStone/usuario/update', upload.array('image', 1), UsuariosController.update)
}


