const Categoria = require('../models/categoria');

module.exports = {

    async getAll (req, res, next){
        try{
            const data = await Categoria.getAll();
            console.log(`Categorias ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        }
        catch (error){
           console.log(`Error ${error}`);
           return res.status(501).json({
           message: 'hubo un error al tratar de obtener las categorias',
           error: error,
           succes: false
        })
     }
},
    
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