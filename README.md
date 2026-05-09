# Clientra — AI-Powered Freelance Manager

> Manage clients, generate winning proposals with AI, and track your income — all in one place.

🌍 **Live Demo:** [clientra-nu.vercel.app](https://clientra-nu.vercel.app)

---

## 🚀 What is Clientra?

Clientra is a full-stack SaaS application built for freelancers. It combines a modern CRM with AI-powered tools to help freelancers win more clients, write better proposals, and track their income — all from one dashboard.

---

## ✨ Features

- 🔐 **Google OAuth Authentication** — Secure login with Supabase Auth
- 👥 **Client Manager** — Track clients from lead to completed with Kanban-style status
- 🤖 **AI Proposal Generator** — Paste a job description, get a winning proposal in seconds
- 🎯 **Cold Outreach Generator** — AI writes LinkedIn messages, cold emails, and follow-ups
- 💰 **Finance Tracker** — Log earnings, track monthly revenue, and monitor income
- 📊 **Real-time Dashboard** — Live stats on clients, proposals, and revenue
- ⚙️ **Settings Page** — Profile management and plan information

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Vite
- React Router
- Supabase JS Client

### Backend
- Python FastAPI
- Supabase (PostgreSQL + Auth)
- OpenAI GPT-4o-mini
- Uvicorn

### Infrastructure
- Frontend → Vercel
- Backend → Render
- Database → Supabase
- Auth → Google OAuth via Supabase

---

## 🗄️ Database Schema

```sql
profiles     → User profiles (linked to Supabase auth)
clients      → Client management with status tracking
proposals    → AI-generated proposals with job descriptions
earnings     → Income tracking per client/project
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Supabase account
- OpenAI API key

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Fill in your Supabase keys
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Fill in your keys
uvicorn main:app --reload
```

### Environment Variables

**Frontend (.env.local)**

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=your_backend_url

**Backend (.env)**

SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
OPENAI_API_KEY=your_openai_api_key

---

## 📁 Project Structure
clientra/
├── frontend/                 # React + TypeScript
│   ├── src/
│   │   ├── components/       # Layout, Sidebar, Topbar
│   │   ├── context/          # Auth context
│   │   ├── lib/              # Supabase + API utils
│   │   └── pages/            # All page components
│   └── vite.config.ts
├── backend/                  # FastAPI
│   ├── routers/              # clients, proposals, earnings
│   ├── models/               # Pydantic schemas
│   ├── services/             # Supabase client
│   └── main.py
└── README.md

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/clients/` | Get all clients |
| POST | `/clients/` | Create client |
| PATCH | `/clients/{id}` | Update client |
| DELETE | `/clients/{id}` | Delete client |
| GET | `/proposals/` | Get all proposals |
| POST | `/proposals/generate` | Generate AI proposal |
| POST | `/proposals/outreach` | Generate cold outreach |
| GET | `/earnings/` | Get all earnings |
| POST | `/earnings/` | Log earning |
| GET | `/earnings/summary` | Get revenue summary |

---

## 🗓️ Built In

14 days of focused development as part of a portfolio project.

---

## 👨‍💻 Author

**Azim Sadath**
- B.Tech Computer Science (Data Science) — Lovely Professional University
- GitHub: [@Azim521](https://github.com/Azim521)
- LinkedIn: [https://www.linkedin.com/in/azim-sadath-a3ba34321/]

---

## 📄 License

MIT License — feel free to use this as inspiration for your own projects.