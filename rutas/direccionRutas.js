const DireccionController = require('../controllers/direccionController');
const passport = require('passport');

module.exports = (app => {

/* GET ROUTES PARA OBTENER DATOS */
    app.get('/BurgerStone/direccion/findByUser/:id_usuario', passport.authenticate('jwt', {session: false}), DireccionController.findByUser);

    // Rutas POST
    app.post('/BurgerStone/direccion/create', passport.authenticate('jwt', {session: false}), DireccionController.create);

})