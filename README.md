# 🏨 Hotel Transilvânia

Sistema de gestão hoteleira fullstack — gerenciamento de quartos, hóspedes e reservas com validação de conflitos.

## 🚀 Stack

**Frontend:** Next.js 16 (App Router) · React 19 · TypeScript · TailwindCSS 4 · Axios · js-cookie · SweetAlert2

**Backend:** Python 3.12 · Flask 3 · Gunicorn · Supabase (PostgreSQL + Auth) · bcrypt · flask-cors

**Infra:** Docker + Compose

## 📦 Funcionalidades

- Autenticação (registro, login, JWT)
- CRUD de quartos com mudança de status e log de auditoria
- CRUD de hóspedes
- Criação e listagem de reservas com validação automática de conflito de datas
- Cálculo automático de preço total (Strategy pattern)
- Soft delete de quartos

## 🛠️ Setup

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-user/hotel-transilvania
cd hotel-transilvania
```

### 2. Configurar variáveis de ambiente

Copie os templates e preencha com seus valores:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**`backend/.env`** — chave do Supabase deve ser a **secret** (`sb_secret_...`), não a publishable, porque o backend precisa bypassar RLS:

```env
SUPABASE_URL=https://sua-instancia.supabase.co
SUPABASE_KEY=sb_secret_xxxxxxxxxx
SECRET_KEY=qualquer-string-aleatoria
```

**`frontend/.env`**:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Criar as tabelas no Supabase

No SQL Editor do [Supabase Dashboard](https://app.supabase.com), execute o conteúdo de [supabase/schema.sql](supabase/schema.sql). Cria as 4 tabelas (`rooms`, `guests`, `reservations`, `room_status_log`) com RLS e policies.

### 4. Subir os containers

```bash
docker compose up --build
```

Nas próximas execuções, apenas:

```bash
docker compose up
```

Aplicação disponível em:
- Frontend → http://localhost:3000
- Backend → http://localhost:5000

### Quando precisa rebuildar

Só é necessário `--build` quando mudar:
- `backend/requirements.txt`
- `frontend/package.json`
- Algum `Dockerfile`

Mudanças em código (`.py`, `.tsx`, `.css`) são detectadas automaticamente pelos servidores de dev — sem rebuild.

## 🧰 Modo dev vs produção

O projeto usa o padrão do Docker Compose com dois arquivos:

- [docker-compose.yml](docker-compose.yml) → configuração de **produção** (gunicorn + Next.js standalone)
- [docker-compose.override.yml](docker-compose.override.yml) → sobreposição de **desenvolvimento** (flask debug + next dev, com hot reload e volumes montados)

O Compose carrega os dois automaticamente. Pra rodar apenas em modo produção:

```bash
docker compose -f docker-compose.yml up --build
```

## 📁 Estrutura

```
Hotel_Transilvania/
├── backend/                       # API Flask (MVC + Repository)
│   ├── app/
│   │   ├── controllers/           # Recebem request, delegam ao service
│   │   ├── services/              # Regras de negócio
│   │   ├── repositories/          # Acesso ao Supabase
│   │   ├── models/                # DTOs (dataclasses)
│   │   ├── routes/                # Registro de blueprints
│   │   ├── middlewares/           # @require_auth, @handle_errors
│   │   ├── utils/                 # generate_token, password hashing
│   │   └── database/              # Supabase client
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                      # Next.js
│   ├── src/
│   │   ├── app/                   # App Router (páginas)
│   │   ├── components/            # UI compartilhada
│   │   ├── controllers/           # Orquestração de ações
│   │   ├── services/              # Chamadas HTTP
│   │   ├── hooks/                 # useRooms, useGuests, etc
│   │   ├── interfaces/            # Tipos TS
│   │   ├── context/               # AuthContext
│   │   └── config/                # Axios + interceptor
│   ├── Dockerfile
│   └── package.json
├── supabase/
│   └── schema.sql                 # Schema + RLS + policies
├── docker-compose.yml             # Produção
└── docker-compose.override.yml    # Dev (hot reload)
```
