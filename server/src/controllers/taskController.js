const taskModel = require('../models/taskModel');

const getAll = (req, res) => {
    taskModel.getAll((err, results) => {
        if(err){
            console.error("Erro no MySQL: ", err);
            return res.status(500).json({error: err.message});
        }
        return res.status(200).json(results);
    });
};

const create = (req, res) => {
    const {titulo, categoria, conteudo, data_fim} = req.body

    taskModel.create({titulo, categoria, conteudo, data_fim}, (err, resulto) =>{
        if(err) {
            console.error("Erro ao inserir: ", err);
            return res.status(500).json({error: err.message});
        }
        return res.status(201).json({id: resulto.insertId, ...req.body})
    });
};

const remove = (req, res) => {
    const {id} = req.params;

    taskModel.remove(id, (err) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        return res.status(204).send();
    });
};

module.exports = {
    getAll,
    creat,
    remove
};