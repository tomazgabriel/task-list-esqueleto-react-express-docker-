import { useEffect, useState } from 'react'
import './App.css'
import api from '.services/api';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

function App() {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState(null);

	const fetchTasks = async () => {
		try {
			const res = await api.get('/tasks');
			setTasks(res.data);
		} catch (err) {setError(err.message);}
	};

	useEffect(() => {fetchTasks();}, []);

	return (
		<>
			<div style={{padding: '20px'}}>
				<h1>Task List</h1>
				{error && <p style={{color:'red'}}>Erro: {error}</p>}

				<TaskForm onSuccess={fetchTasks} />
				<hr />

				{tasks.lenght === 0 && !error ? <p>Banco vazio</p> :
					tasks.map(t => (
						<TaskItem key={t.id} task={t} onDeleteSucess={fetchTasks} />
					))
				}
			</div>
		</>
	)
}

export default App;
