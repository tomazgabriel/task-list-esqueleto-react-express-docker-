const connection = require('./connection');

const getAll = (callback) => {
    connection.query('SELECT * FROM tasks', callback);
};

const create = (taskData, callback) => {
    const {titulo, categoria, conteudo, data_fim} = taskData;
    const query = `INSERT INTO tasks (titulo, categoria, conteudo, data_fim) VALUES (?,?,?,?)`;
    connection.query(query, [titulo, categoria, conteudo, data_fim], callback);
};

const remove = (id, callback) => {
    const query = `DELETE FROM tasks WHERE id = ?`;
    connection.query(query, [id], callback);
};

module.exports = {
    getAll,
    create,
    remove
};