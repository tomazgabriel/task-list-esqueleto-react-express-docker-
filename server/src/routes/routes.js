const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

//Mapeamento das rotas para Controller
router.get('/tasks', taskController.getAll);
router.post('/tasks', taskController.create);
router.delete('/tasks/:id', taskController.remove);

module.exporter = router;