

# Scribiq 📝

**An AI-powered, full-stack note-taking app built with the MERN stack.**

Scribiq lets you create, manage, and search your notes — with a built-in AI assistant powered by Google Gemini that helps you write faster and think clearer. Built with a clean dark UI, real-time search, and a secure backend with rate limiting to keep things running smoothly.

---

## Demo Video

https://raw.githubusercontent.com/Hansika2424/Scribiq-Note-Taking-App-using-MERN/main/frontend%20-%20Google%20Chrome%202026-04-19%2014-00-25%20(1).mp4




## Screenshot

### Create a Note - using AI assistance
![Create Note](https://github.com/Hansika2424/Scribiq-Note-Taking-App-using-MERN/blob/main/Screenshot%202026-04-04%20135823.png?raw=true)

---

## Features

- **AI Writing Assistance** — Hit Improve, Fix Grammar, Expand, or Summarize and let Gemini 2.0 Flash rewrite your note content instantly
- **Full CRUD** — Create, read, update, and delete notes with a clean and intuitive interface
- **Real-time Search** — Instantly filter through your notes as you type
- **Rate Limiting** — Backend requests are rate-limited via Upstash Redis to prevent abuse and keep the server stable
- **Responsive Dark UI** — Built with TailwindCSS and DaisyUI, works seamlessly across desktop and mobile
- **Smooth Navigation** — Client-side routing via React Router with Axios handling all API calls

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, TailwindCSS, DaisyUI, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI | Google Gemini 2.0 Flash API |
| Rate Limiting | Upstash Redis |

---

## Project Structure

```
Scribiq-Note-Taking-App-using-MERN/
├── backend/
│   ├── models/          # MongoDB note schema
│   ├── routes/          # Express API routes
│   ├── middleware/      # Rate limiting middleware (Upstash Redis)
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level views
│   │   └── App.jsx      # Root component with routing
│   └── index.html
└── package.json         # Root scripts for build & start
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB connection string (local or Atlas)
- [Google Gemini API key](https://aistudio.google.com/)
- [Upstash Redis](https://upstash.com/) account (free tier works)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Hansika2424/Scribiq-Note-Taking-App-using-MERN.git
cd Scribiq-Note-Taking-App-using-MERN
```

**2. Set up the backend**
```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:
```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
PORT=5000
```

**3. Set up the frontend**
```bash
cd ../frontend
npm install
```

Create a `.env` file inside `/frontend`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

**4. Run the app**

In one terminal (backend):
```bash
cd backend
npm run dev
```

In another terminal (frontend):
```bash
cd frontend
npm run dev
```

The app will be running at `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Fetch all notes |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |
| POST | `/api/ai/suggest` | Get AI-generated content suggestion |

---

## Why Upstash Redis for Rate Limiting?

Traditional Redis requires a persistent TCP connection. Upstash Redis is **HTTP-based**, so every request is stateless — no connection management needed, and it works perfectly in any deployment environment. Each user is limited to a set number of API calls per window, returning a `429 Too Many Requests` response if exceeded.

---

## Author

**Hansika Srivastava**
[GitHub](https://github.com/Hansika2424) · [LinkedIn](https://linkedin.com/in/hansika-srivastava-b89b3b251/)
