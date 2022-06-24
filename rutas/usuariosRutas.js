//vamos a ejecutar las rutas para ejecutar los metodos// PARTE DE CREANDO API REST
const UsuariosController = require('../controllers/usuariosController');

module.exports = (app, upload) => {
    //traer datos
    app.get('/BurgerStone/usuario/getAll', UsuariosController.getAll);//para crear una nueva ruta

    //guardar datos
    app.post('/BurgerStone/usuario/create', upload.array('image', 1), UsuariosController.register);
    app.post('/BurgerStone/usuario/login',UsuariosController.login);

}