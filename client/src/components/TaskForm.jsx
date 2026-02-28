import {useState} from 'react';
import api from '../services/api';

export default function TaskForm({onSuccess}){
    const [form, setForm] = useState({titulo: '', categoria: '', conteudo: '', data_fim: ''});
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await api.post('/tasks, form');
            setForm({titulo: '', categoria: '', conteudo: '', data_fim: ''});
            onSuccess(); //Recarrega a lista
        }catch(err){alert("Erro ao salvar");}
    };

    return(
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
            <input placeholder="Título" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} required />
            <input placeholder="Categoria" value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} />
            <textarea placeholder="Conteúdo" value={form.conteudo} onChange={e => setForm({...form, conteudo: e.target.value})} />
            <input type="datetime-local" value={form.data_fim} onChange={e => setForm({...form, data_fim: e.target.value})} />
            <button type="submit">Salvar Tarefa</button>
        </form>
    );
}