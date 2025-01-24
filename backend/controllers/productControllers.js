const db = require('../config/db');

//Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos');
        res.status(200).json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
};

//Crear un producto
exports.createProduct = async (req, res) => {
    const { nombre, categoria, precio, stock} = req.body;
    try {
    await db.query('INSERT INTO productos (nombre, categoria, precio, stock) VALUES(?, ?, ?, ?)', [nombre, categoria, precio, stock]);
    res.status(201).send('Producto creado correctamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el producto');
    }
};

//Actualizar un producto
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const {nombre, categoria, precio, stock} = req.body;
    
    try{
        await db.query('UPDATE productos SET nombre = ?, categoria = ?, precio = ?, stock = ? WHERE id = ?', [nombre, categoria, precio, stock, id]);
        res.status(200).send('Producto actualizado correctamente');
    }
    catch (error){
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};

//Eliminar un producto
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM productos WHERE id = ?', [id]);
        res.status(200).send('Producto eliminado correctamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto');
    }
    
};