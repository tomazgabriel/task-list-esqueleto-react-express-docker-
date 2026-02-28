import api from '../services/api';

export default function TaskItem({task, onDeleteSucess}) {
    const handleDelete = async () => {
        if(!window.confirm("Deseja mesmo excluir?")) return;
        try{
            await api.delete(`/tasks/${task.id}`);
            onDeleteSucess();
        } catch (err) {alert("Erro ao excluir");}
    };

    return (
        <div style={{borderBottom: '1px solid #eee, padding: 10px 0'}}>
            <h4>{task.titulo} <small>({task.categoria})</small></h4>
            <p>{task.conteudo}</p>
            <button onClick={handleDelete} style={{backgroundColor: '#ff4d4', color: 'white', border: 'none', cursoe: 'pointer'}}>
                Excluir
            </button>
        </div>
    );
}