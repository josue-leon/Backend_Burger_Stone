//vamos a ejecutar las rutas para ejecutar los metodos// PARTE DE CREANDO API REST
const UsuariosController = require('../controllers/usuariosController');

module.exports = (app) => {
    //traer datos
    app.get('/BurgerStone/usuario/getAll', UsuariosController.getAll);//para crear una nueva ruta

    //guardar datos

    app.post('/BurgerStone/usuario/create',UsuariosController.register)
}