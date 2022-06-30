const passport = require('passport');
const categoriasController = require('../controllers/categoriasController');

module.exports = (app => {

    // Rutas POST
    app.post('/BurgerStone/categorias/create', passport.authenticate('jwt', {session: false}), categoriasController.create);
})