const { create, findByUser } = require('../models/direccion');
const Direccion = require('../models/direccion');

module.exports = {

    async findByUser(req, res, next){
        try{
            const id_usuario = req.params.id_usuario;
            const data = await Direccion.findByUser(id_usuario);
            console.log(`Direccion ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        }
        catch (error){
           console.log(`Error ${error}`);
           return res.status(501).json({
           message: 'hubo un error al tratar de obtener las direcciones',
           error: error,
           succes: false
            })
        }
    },

    async create(req, res, next) {
        try 
        {
            const direccion = req.body;
            const data = await Direccion.create(direccion);

            return res.status(201).json({
                success: true,
                message: 'La dirección se creó correctamente',
                data: data.id
            });

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la dirección',
                error: error
            });
        }
    }
}