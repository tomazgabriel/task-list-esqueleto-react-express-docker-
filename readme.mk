#Esqueleto para REACT+EXPRESS+DOCKER

#PENDENTE:
- ENV
- DEPLOY (AUTO)

#Projeto simples de task list para eu utilizar como esqueleto futuramente

#Configuração do Docker
Dockerfile: Inicialização com src/index.js
Server: localhost:3001
React: localhost:5173

#Configuração do backend (Express + MySQL2)
Middleware: CORS e Connection Pool
Dependências:
	express, mysql2, cors
	Dockerfile: FROM node:20 para compatibilidade com o Vite
	ROTAS: GET, POST E DELETE

Config: src/models/connection.js
	- Gerencia o Pool de conexão com o MySQL
	Model: src/models/taskModel.js
	- única camada que conhece o SQL
	Controller: src/controllers/taskController.js
	- Processas as requisições(req), chama o Model e define os status HTTP
	Routes: src/routes/routes.js
	- Define os endpoints(/tasks) e associa aos métodos do Controller
	Entry Point: src/index.js
	- Inicializa o Express, CORS e carrega rotas

#Configuração do Frontend (React + Vite + Axios)
Scripts no package.json: dev: "vite -- host"
Axios: Esperar a promessa do servidor(Await)
Re-fetch: Chamar a função fetchTasks() para atualizar o useState
API Service: src/services/api.js
	- Implementação do Axios com baseURL configurada
	Componente TaskForm: Isolou a lógica de estado dos inputs e o envio de tarefas
	Componente TaskItem: Isolou a renderização individual de cada tarefa e a lógica de exclusão
	Refatoração do App.jsx: Atua apenas como um gerenciado de estado global e os erros de conexão


#Cheat Sheet
Subir o ambiente: sudo docker compose up --build
Criar Schema do db(terminal): sudo docker exec -it $(sudo docker ps -qf "name=db") mysql -u root -p -e
	"CREATE DATABASE IF NOT EXISTS crud_db;
	USE crud_db;
	CREATE TABLE tasks (id INT AUTO_INCREMENT PRIMARY KEY, titulo VARCHAR(255) NOT NULL, categoria VARCHAR(50), conteudo TEXT, data_inicio DATETIME DEFAULT CURRENT_TIMESTAMP, data_fim DATETIME, status ENUM('pendente', 'em_progresso', 'concluida') DEFAULT 'pendente');"
	OBS: Não esquecer de alterar o schema para outros projetos

Limpeza se o Docker travar:
	sudo docker compose down --volumes --remove-orphans
	sudo docker builder prune -f

Network Error: Configuração do CORS
SQL Syntax Error: Variável undefined no SQL - Verificar se o id está chegando na rota via req.params.id
404 Not Found: Cache do Docker - Refazer compose
Erro 'msg' not defined: Referência fantasma no JSX - Remover variáveis não declaradas no UseState

#Fluxo de Execução
Init Local: Rode npm init -y no server e npm create vite@latest no client
Configurar Dockerfiles: Copie os modelos
Configurar Compose: Defina as portas e os links de serviço
Build: Rode docker compose up --build
Schema: Execute o comando de CREATE TABLE no container
Validar: Teste o GET
