const express = require('express');
const session = require("express-session");
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const io = require('socket.io')(server);

// SOCKETS
const orderDeliverySocket = require ('./sockets/orders_delivery_socket');

/*
* Inicializar Firebase Admin
*/
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})

/*
*Se va a instanciar las RUTAS// PARTE DE CREANDO API REST
RUTAS
*/
const usuarios = require('./rutas/usuariosRutas');
const categorias = require('./rutas/categoriasRutas');
const productos = require('./rutas/productosRutas');
const direccion = require('./rutas/direccionRutas');
const orden = require('./rutas/ordenRutas');

const { credential } = require('firebase-admin');

const port = process.env.PORT || 3000;

app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true
      })
);
app.use(passport.initialize());
app.use(passport.authenticate('session'));
require('./config/passport')(passport);

app.disable('x-powered-by');
app.set ('port', port);

// Llamar a los Sockets
orderDeliverySocket(io);

/*server.listen(3000, 'localhost', function(){
    console.log('Aplicacion de NodeJs ' +port + ' Iniciada..')
})*/

//JOSUE

/*server.listen(3000, '192.168.0.120' || 'localhost', function(){
    console.log('Aplicacion de NodeJs ' +port + ' Iniciada..')
});*/

//MICHELLE
server.listen(3000, '192.168.9.1' || 'localhost', function(){
    console.log('Aplicacion de NodeJs ' +port + ' Iniciada..')
});


// Michelle ESPOCH
/*server.listen(3000, '172.25.235.131', function(){
    console.log('Aplicacion de NodeJs ' +port + ' Iniciada..')
});*/

/*
*PARA EJECUTAR se llama a las RUTAS// PARTE DE CREANDO API REST
*/

//ANDrEA /Darwin
/*
server.listen(3000, '192.168.100.15' || 'localhost', function(){
    console.log('Aplicacion de NodeJs ' +port + ' Iniciada..')
})
*/

// Llamando a las RUTAS
usuarios (app, upload);
categorias(app);
direccion(app);
orden(app);
productos(app, upload);

/*


/*app.get('/', (req, res)=>{
    res.send('Ruta Raiz')
});

app.get('/test', (req, res)=>{
    res.send('Estamos en la ruta test')
});*/


//Error hanlder
app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

// CREANDO API REST

module.exports = {
    app: app,
    server: server
}
//200 - ES UNA REPSUESTA EXITOSA
//404 - URL NO EXISTE
//500 - ERROR INTERNO EN EL SERVER