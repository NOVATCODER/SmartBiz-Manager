const db = require('./backend/config/db');

async function testDB() {
    try {
        //consulta sql
        const [rows] = await db.query('SELECT NOW() AS current_time_value');
        console.log('consulta exitosa: ', rows);
    }
        catch (error) {
            console.error('Error ejecutando consulta: ', error.message);
        }
}

testDB();