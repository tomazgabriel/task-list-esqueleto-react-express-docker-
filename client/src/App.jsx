import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
	// 'Task' para guardar a lista e 'error' para msg de erro
	const [tasks, setTasks] = useState([]);
	const [form, setForm] = useState({titulo: '', categoria: '', conteudo: '', data_fim: ''});
	const [error, setError] = useState(null);

	const fetchTasks = () => axios.get('http://localhost:3001/tasks').then(res => setTasks(res.data));
	useEffect(() => {fetchTasks()}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
			await axios.post('http://localhost:3001/tasks', form);
			setForm({titulo: '', categoria: '', conteudo: '', data_fim: ''});
			fetchTasks(); //atualizar lista
		} catch(err){alert("Erro ao salvar");}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Deseja mesmo excluir esta tarefa?")){
			try{
				await axios.delete(`http://localhost:3001/tasks/${id}`);
				fetchTasks(); //Atualizar lista
			} catch(err){
				console.error("Erro: ", err.response?.data || err.message);
				alert("Erro ao excluir " + (err.response?.status || "Conexão"));
			}
		}
	};

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
				{tasks.length === 0 && !error && <p>Conectado, mas o banco está vazio</p>}
			</div>
			<div style={{ padding: '20px' }}>
			<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
				<input placeholder="Título" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} required />
				<input placeholder="Categoria" value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} />
				<textarea placeholder="Conteúdo" value={form.conteudo} onChange={e => setForm({...form, conteudo: e.target.value})} />
				<input type="datetime-local" value={form.data_fim} onChange={e => setForm({...form, data_fim: e.target.value})} />
				<button type="submit">Salvar Tarefa</button>
			</form>

			<hr />
			{tasks.map(t => (
				<div key={t.id} style={{ borderBottom: '1px solid #eee' }}>
				<h4>{t.titulo} <small>({t.categoria})</small></h4>
				<p>{t.conteudo}</p>
				<button
					onClick={() => handleDelete(t.id)}
					style={{backgroundColor: '#ff4d4d', color:'white', border: 'none', cursor:'pointer'}}
					>Excluir</button>
				</div>
			))}
			</div>
		</>
	)
}

export default App
