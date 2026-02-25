const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createPool({
        host: process.env.DB_HOST || "localhost",
        user: "root",
        password: "root",
        database: "crud_db",
});

// rota de teste
app.get('/tasks', (req, res) => {
        db.query('SELECT * FROM tasks', (err, results) => {
                if (err) {
                        console.error("Erro no MySQL", err);
                        return res.status(500).json({error: err.message});
                }
                res.json(results);
        });
});

app.listen(3001, '0.0.0.0', () => {
        console.log("Backend rodando na porta 3001")
});