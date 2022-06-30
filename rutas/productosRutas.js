const ProductosController = require('../controllers/productosController');
const passport = require('passport');

module.exports = (app, upload) => {
    app.post('/BurgerStone/productos/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductosController.create);
}