# 🏨 Hotel Transilvânia

Sistema de reservas de hotel inspirado no universo do filme Hotel Transylvania.
O projeto é uma aplicação fullstack construída para fins de estudo e portfólio.

## 🚀 Tecnologias

### Frontend:

- Next.js
- TypeScript
- TailwindCSS

### Backend:

- Python
- Flask
- PostgreSQL / Supabase

## 📦 Funcionalidades

- Cadastro e login de usuários
- Listagem de quartos
- Reserva de quartos
- Visualização de reservas
- Painel administrativo simples

## 🛠️ Executando o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-user/hotel-transilvania
cd hotel-transilvania
```

### 2. Configurar variáveis de ambiente

Crie os arquivos `.env` (eles estão no `.gitignore` e não são versionados).

**`backend/.env`**
```env
SUPABASE_URL=https://sua-instancia.supabase.co
SUPABASE_KEY=sua-supabase-key
SECRET_KEY=uma-secret-key
```

**`frontend/.env`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🐳 Rodando com Docker (recomendado)

Pré-requisitos: [Docker](https://docs.docker.com/get-docker/) e Docker Compose.

Na raiz do projeto:

```bash
docker compose up --build
```

Para rodar em segundo plano:

```bash
docker compose up -d --build
```

Para parar:

```bash
docker compose down
```

Serviços disponíveis:
- Frontend: http://localhost:3000
- Backend:  http://localhost:5000

---

## 💻 Rodando localmente (sem Docker)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Linux/Mac
# venv\Scripts\activate         # Windows
pip install -r requirements.txt
python run.py
```

Serviços disponíveis:
- Frontend: http://localhost:3000
- Backend:  http://localhost:5000

---

## 📁 Estrutura do projeto

```
Hotel_Transilvania/
├── backend/            # API Flask
│   ├── app/
│   ├── requirements.txt
│   ├── run.py
│   └── Dockerfile
├── frontend/           # App Next.js
│   ├── src/
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```
