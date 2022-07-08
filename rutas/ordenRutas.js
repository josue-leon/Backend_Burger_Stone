const OrdenController = require('../controllers/ordenController');
const passport = require('passport');

module.exports = (app => {

/* GET ROUTES PARA OBTENER DATOS */
    app.get('/BurgerStone/orden/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrdenController.findByStatus);

    // Rutas POST
    app.post('/BurgerStone/orden/create', passport.authenticate('jwt', {session: false}), OrdenController.create);

})