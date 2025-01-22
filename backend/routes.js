const express = require('express');
const router = express.Router();

//controladores (logica de cada ruta)
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');

//Rutas para la gestion de usuarios
router.post('/register', userController.register); //registro de usuarios
router.post('/login', userController.login);//Autenticacion de usuarios
router.get('/profile', userController.getProfile);

//Rutas para la gestion de productos
router.get('/products', productController.getAllProducts); //obtener todos los productos
router.post('/products', productController.createProduct);//Crear producto
router.put('/products/:id', productController.updateProduct);//Actualizar un producto
router.delete('/products/:id', productController.deleteProduct);//Borrar un producto

module.exports = router;