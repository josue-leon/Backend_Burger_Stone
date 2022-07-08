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

    async create(req, res, next) {
        try 
        {
            let orden = req.body;
            orden.status = 'PAGADO';
            const data = await Orden.create(orden);

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
    }
}