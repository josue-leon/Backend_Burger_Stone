const { update } = require('../models/orden');
const Orden = require('../models/orden');
const OrdenProducto = require('../models/orden_producto');

module.exports = {

    async findByStatus(req, res, next){
        try{
            const status = req.params.status;
            const data = await Orden.findByStatus(status);
            console.log(`Status ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        }
        catch (error){
           console.log(`Error ${error}`);
           return res.status(501).json({
           message: 'hubo un error al tratar de obtener las órdenes por status',
           error: error,
           succes: false
            })
        }
    },

    async findByDeliveryAndStatus(req, res, next){
        try{
            const id_repartidor = req.params.id_repartidor;
            const status = req.params.status;

            const data = await Orden.findByDeliveryAndStatus(id_repartidor, status);
            console.log(`Status ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        }
        catch (error){
           console.log(`Error ${error}`);
           return res.status(501).json({
           message: 'hubo un error al tratar de obtener las órdenes por status',
           error: error,
           succes: false
            })
        }
    },

    async create(req, res, next) {
        try 
        {
            let orden = req.body;
            orden.status = 'PAGADO';
            const data = await Orden.create(orden);

            console.log('LA ORDEN SE CREÓ CORRECTAMENTE');

            // Recorrer todos los productos agregados a la orden
            for (const producto of orden.producto) {
                await OrdenProducto.create(data.id, producto.id, producto.cantidad);
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se creó correctamente',
                data: data.id
            });

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la orden',
                error: error
            });
        }
    },

    async updateToDispatched(req, res, next) {
        try 
        {
            let orden = req.body;
            orden.status = 'DESPACHADO';
            await Orden.update(orden);

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizó correctamente',
            });

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateToOnTheWay(req, res, next) {
        try 
        {
            let orden = req.body;
            orden.status = 'EN CAMINO';
            await Orden.update(orden);

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizó correctamente',
            });

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    }
}