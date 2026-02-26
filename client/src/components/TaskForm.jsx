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
        <div></div>
    )
}