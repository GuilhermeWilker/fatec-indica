import mysql from 'mysql';

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "fatecindica",
});

db.connect((err) => {
    if (err) throw err;
    console.log('Banco de Dados Conectado com Sucesso!');
});

export default db;
