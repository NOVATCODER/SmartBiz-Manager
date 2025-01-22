const bcrypt = require('bcrypt'); // Para encriptar contrasenias
const db = require('../config/db'); // Conexion a la base de datos
const e = require('express');

// Registro de usuario
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Encripta el password
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).send('Usuario registrado correctamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar usuario');
    }
};

//Login de usuario
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(password, user.password); //Verifica el password
            if (match) {
                res.status(200).send('Incio de sesion exitoso');
            }
            else{
                res.status(401).send('Password incorrecto');
            }   
        }
        else{
            res.status(404).send('Usuario no encontrado');
        }
        
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesion');
    }
};

//Obtener perfil de usuario
exports.getProfile = async (req, res) => {
 try {
    res.status(200).send('Perfil del usuario (placeholder)');
 }
 catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener perfil de usuario');
 }
 
};