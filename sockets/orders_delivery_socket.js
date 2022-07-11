module.exports = (io) =>
{

    const orderDeliveryNamespace = io.of('/orders/delivery');
    orderDeliveryNamespace.on('connection', function(socket)
    {
        console.log('USUARIO CONECTADO AL NAMESPACE /orders/delivery');

        socket.on('position', function(data) {
            console.log(`EMITIÓ ${JSON.stringify(data)}`);
            orderDeliveryNamespace.emit(`position/${data.id_orden}`, {latitud: data.latitud, longitud: data.longitud});
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DESCONECTADO');
        });
    });
}