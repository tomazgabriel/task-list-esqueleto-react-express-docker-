import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
	// 'Task' para guardar a lista e 'error' para msg de erro
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get('http://localhost:3001/tasks')
			.then(res => {
				setTasks(res.data);
				console.log("Dados do db:", res.data);
			})
			.catch(err => {
				setError(err.message);
				console.error("Erro de conexão:",err);
			})
	}, []);

	return (
		<>
			<div>
				<h1>Task List (React, Express, MySQL, Docker)</h1>
				{error && <p style={{color: 'red'}}>Erro: {error}</p>}

				{tasks.map((task) => (
				<div key={task.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
					<h3>{task.titulo} <small>({task.categoria})</small></h3>
					<p>{task.conteudo}</p>
					<p><strong>Status:</strong> {task.status}</p>
					<p><strong>Prazo:</strong> {new Date(task.data_fim).toLocaleString()}</p>
				</div>
				))}

				{tasks.length === 0 && !error && <p>Conectado, mas o banco está vazio</p>}
			</div>
		</>
	)
}

export default App
