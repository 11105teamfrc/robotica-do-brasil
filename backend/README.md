
Robótica do Brasil - Backend
===========================

This is a simple Node.js + Express backend with SQLite for the "robotica-do-brasil" static site.

Files:
- server.js         : main Express server
- init_db.js        : initializes `data.db` with sample data and an `admin` user (password: admin123)
- package.json      : dependencies and scripts
- data.db           : (created after running init-db)
- public/           : optional static files (empty by default)

Quick start:
1. Install Node 18+.
2. In the project directory run:
   npm install
   npm run init-db
   npm start
3. Server will run on http://localhost:4000

API endpoints:
GET  /api/health
POST /api/auth/login       { username, password } -> { token }
GET  /api/equipes
GET  /api/equipes/:id
POST /api/equipes          (protected) -> create
PUT  /api/equipes/:id      (protected) -> update
DELETE /api/equipes/:id    (protected) -> delete
GET  /api/premios
GET  /api/premios/:id
