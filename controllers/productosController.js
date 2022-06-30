const Producto = require('../models/producto');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    async create(req, res, next) 
    {
        let producto = JSON.parse(req.body.producto);
        const files = req.files;
        let inserts = 0;

        if (files.length == 0)
        {
            return res.status(501).json({
                message: 'Error al registrar el producto, inserte una imagen',
                success: false
            });
        }
        else {
            try
            {
                const data = await Producto.create(producto); // Almacenando el producto
                producto.id = data.id;

                const start = async () => {
                    await asyncForEach(files, async (file) => {
                        const pathImage = `image_${Date.now()}`;
                        const url = await storage(file, pathImage);

                        if (url !== undefined && url!== null)
                        {
                            if (inserts == 0) // Imagen 1
                            {
                                producto.imagen1 = url;
                            }
                            else if(inserts == 1) // Imagen 2
                            {
                                producto.imagen2 = url;
                            }
                            else if(inserts == 2) // Imagen 3
                            {
                                producto.imagen3 = url;
                            }
                        }

                        await Producto.update(producto);
                        inserts = inserts + 1;
                        
                        if (inserts == files.length) 
                        {
                            return res.status(201).json ({
                                success: true,
                                message: 'El producto se ha registrado correctamente'
                            })
                        }

                    });
                }

                start();
            } 
            catch (error)
            {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    message: 'Error al registrar el producto ${error}',
                    success: false,
                    error: error
                });
            }

        }
    }
}