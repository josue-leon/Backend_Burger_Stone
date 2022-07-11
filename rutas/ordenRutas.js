const OrdenController = require('../controllers/ordenController');
const passport = require('passport');

module.exports = (app => {

/* GET ROUTES PARA OBTENER DATOS */
    app.get('/BurgerStone/orden/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrdenController.findByStatus);
    app.get('/BurgerStone/orden/findByDeliveryAndStatus/:id_repartidor/:status', passport.authenticate('jwt', {session: false}), OrdenController.findByDeliveryAndStatus);
    app.get('/BurgerStone/orden/findByClientAndStatus/:id_cliente/:status', passport.authenticate('jwt', {session: false}), OrdenController.findByClientAndStatus);

    // Rutas POST
    app.post('/BurgerStone/orden/create', passport.authenticate('jwt', {session: false}), OrdenController.create);

    // Rutas para actualizar
    app.put('/BurgerStone/orden/updateToDispatched', passport.authenticate('jwt', {session: false}), OrdenController.updateToDispatched);
    app.put('/BurgerStone/orden/updateToOnTheWay', passport.authenticate('jwt', {session: false}), OrdenController.updateToOnTheWay);
    app.put('/BurgerStone/orden/updateToDelivery', passport.authenticate('jwt', {session: false}), OrdenController.updateToDelivery);

})