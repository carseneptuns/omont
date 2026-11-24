# OMONT — Type Your Memory

A quiet little digital typewriter where you can leave your thoughts.

## What's in here

```
omont/
├── frontend/   React + Vite + Tailwind CSS
└── backend/    Flask + PyMySQL + MySQL
```

## 1. Database

```bash
mysql -u root -p < backend/schema.sql
```

This creates the `omont_db` database and the `memories` table. (The backend
will also try to create the table itself on startup if it's missing.)

## 2. Backend

```bash
cd backend
python3 -m venv venv && source venv/bin/activate   # optional but recommended
pip install -r requirements.txt
cp .env.example .env        # edit DB_PASSWORD etc. if needed
python3 app.py
```

Runs on `http://localhost:5000`. Health check: `GET /api/health`.

## 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env        # points at the backend above
npm run dev
```

Runs on `http://localhost:5173`.

## API

| Method | Route                 | Description          |
|--------|-----------------------|-----------------------|
| GET    | /api/memories          | list all memories (optionally `?search=`) |
| GET    | /api/memories/:id      | get one memory        |
| POST   | /api/memories          | create a memory        |
| PUT    | /api/memories/:id      | update a memory        |
| DELETE | /api/memories/:id      | delete a memory        |

## Notes

- The typewriter's color, the paper, and the writing area are all custom
  components (`src/components/Typewriter.jsx`, `Paper.jsx`,
  `WritingArea.jsx`) — no textarea-looking form anywhere.
- Autosave debounces 1s after you stop typing; the color change autosaves
  on a 300ms debounce.
- Optional typing sound is intentionally left as a stub — drop a short
  key-click `.mp3`/`.wav` into `frontend/src/assets/sounds/` and wire it
  into `WritingArea.jsx`'s `onType` handler if you want it.
