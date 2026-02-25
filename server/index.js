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


//post
app.post('/tasks', (req, res) => {
        const {titulo, categoria, conteudo, data_fim} = req.body;

        const query = `INSERT INTO tasks (titulo, categoria, conteudo, data_fim) VALUES (?,?,?,?)`;

        db.query(query, [titulo, categoria, conteudo, data_fim], (err, result) => {
                if(err) {
                        console.error("Erro ao inserir:", err);
                        return res.status(500).json({error: err.message});
                }
                //Retornar o objeto criado com o ID gerado pelo MySQL
                res.status(201).json({id: result.insertId, ...req.dody});
        });
});

//delete
app.delete('/tasks/:id', (req,res) => {
        const {id} = req.params;
        const query = 'DELETE FROM tasks WHERE id = ?';

        db.query(query, [id], (err, result) => {
                if(err) return res.status(500).json(err);
                //204 No Content status para deleção
                res.status(204).send();
        });
});

app.listen(3001, '0.0.0.0', () => {
        console.log("Backend rodando na porta 3001")
});