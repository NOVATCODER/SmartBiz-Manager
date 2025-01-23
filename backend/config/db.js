//Importo las dependencias necesesarias.
const mysql = require('mysql2'); //Libreria necesaria para interactuar con MySQL.
const dotenv = require('dotenv'); //Libreria necesaria para leer el archivo .env.

//Determina el archivo de configuracion segun el ambiente
const envFile = process.env.NODE_ENV === 'production' ? 'env.production': '.env';

dotenv.config({path: envFile});
console.log(`Cargando configuracion desde ${envFile}`);

//Verifica que todas las variables de entorno enten definidas.
['DB_HOST', 'DB_USER', 'DB_NAME'].forEach((key) => {
    if (!process.env[key]) {
        console.error(`Falta la variable de entorno: ${key}`);
        process.exit(1);//termina el proceso si falta una variabale
    }
});

//Crea un pool de conexiones a MySQL 
const pool = mysql.createPool({
    host: process.env.DB_HOST,//DIRECCION DEL SERVIDOR DE MySQL
    user: process.env.DB_USER,//Usuario de la base de datos
    password: process.env.DB_PASSWORD,//Contraseña del usuario
    database: process.env.DB_NAME//Nombre de la base de datos
});
//Verifico la conexion  incial a la piscina
pool.getConnection((err)    =>  {
    if  (err){
        console.error('Error conectando a la base de datos:', err.message);
        process.exit(1); //Salir si falla la conexion.
    }
    else    {
        console.log('Conexion a la base de datos exitosa');
    }
});
//Exporto el pool para usarlo en otras partes del proyecto
module.exports = pool.promise();