const express = require('express'); //Framework para la creacion del server.
const db = require('../config/db'); //Importo el archivo de conexion.

const app = express(); //Creo la app de express

//Prueba de la ruta de conexion
app.get('/test', async (req, res) => {
try {
    //Ejecucion de una consulta simple en la bd
    const [rows]    =   await   db.query('SELECT 1 + 1 AS solution');
    res.send(`Conexion exitosa! Resultado: ${rows[0].solution}`);
}   catch (error) {
    res.status(500).send('Fallo la conexion a la bd.');
}
});
//Inicio el server en el puerto 3000
app.listen(3000, () =>{
    console.log('Server corriendo en http://localhost:3000');
});