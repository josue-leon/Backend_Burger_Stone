const passport = require('passport');
const categoriasController = require('../controllers/categoriasController');

module.exports = (app => {

    

/* GET ROUTES PARA OBTENER DATOS */
     app.get('/BurgerStone/categorias/getAll', passport.authenticate('jwt', {session: false}), categoriasController.getAll);

    // Rutas POST
    app.post('/BurgerStone/categorias/create', passport.authenticate('jwt', {session: false}), categoriasController.create);

})