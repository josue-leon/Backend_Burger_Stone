const Categoria = require('../models/categoria');

module.exports = {
    
    async create(req, res, next) {
        try{
            const categoria = req.body;
            console.log(`Categoría enviada: ${categoria}`);

            const data = await Categoria.create(categoria);

            return res.status(201).json({
                message: 'La categoría se creó correctamente',
                success: true,
                data: data.id
            })
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al crear la categoría',
                success: false,
                error: error
            });
        } 
    }
}