const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');


/*
*Se va a instanciar las RUTAS// PARTE DE CREANDO API REST
*/
const usuarios = require('./rutas/usuariosRutas');

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.disable('x-powered-by');
app.set ('port', port);

/*server.listen(3000, 'localhost', function(){
    console.log('Aplicacion de NodeJs ' +port + ' Iniciada..')
})*/

//JOSUE
/*
server.listen(3000, '192.168.0.120' || 'localhost', function(){
    console.log('Aplicacion de NodeJs ' +port + ' Iniciada..')
});
*/

//MICHELLE
server.listen(3000, '192.168.9.1' || 'localhost', function(){
    console.log('Aplicacion de NodeJs ' +port + ' Iniciada..')
});

/*
*PARA EJECUTAR se llama a las RUTAS// PARTE DE CREANDO API REST
*/

usuarios (app);
/*
//ANDrEA /Darwin


server.listen(3000, '192.168.100.15' || 'localhost', function(){
    console.log('Aplicacion de NodeJs ' +port + ' Iniciada..')
})*/

//que cague que te funciono asi xD no te rias


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