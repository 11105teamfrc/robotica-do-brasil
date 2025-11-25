const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET || 'root';

const dbFile = path.join(__dirname, 'data.db');
const db = new sqlite3.Database(dbFile);

app.use(cors());
app.use(express.json());

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'missing token' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'malformed token' });
  jwt.verify(token, SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'invalid token' });
    req.user = payload;
    next();
  });
}

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  db.get('SELECT id, username, password_hash FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error' });
    if (!row) return res.status(401).json({ error: 'invalid credentials' });
    bcrypt.compare(password, row.password_hash).then(match => {
      if (!match) return res.status(401).json({ error: 'invalid credentials' });
      const token = jwt.sign({ id: row.id, username: row.username }, SECRET, { expiresIn: '8h' });
      res.json({ token, user: { id: row.id, username: row.username } });
    }).catch(e => res.status(500).json({ error: 'bcrypt error' }));
  });
});

app.get('/api/equipes', (req, res) => {
  const q = 'SELECT * FROM equipes ORDER BY nome';
  db.all(q, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'db error' });
    res.json(rows);
  });
});

app.get('/api/equipes/:id', (req, res) => {
  db.get('SELECT * FROM equipes WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error' });
    if (!row) return res.status(404).json({ error: 'not found' });
    res.json(row);
  });
});

app.post('/api/equipes', authenticate, (req, res) => {
  const { nome, cidade, estado, categoria, descricao, contato } = req.body;
  const stmt = 'INSERT INTO equipes (nome,cidade,estado,categoria,descricao,contato) VALUES (?,?,?,?,?,?)';
  db.run(stmt, [nome,cidade,estado,categoria,descricao,contato], function(err){
    if (err) return res.status(500).json({ error: 'db error' });
    db.get('SELECT * FROM equipes WHERE id = ?', [this.lastID], (e,row)=> res.status(201).json(row));
  });
});

app.put('/api/equipes/:id', authenticate, (req, res) => {
  const { nome, cidade, estado, categoria, descricao, contato } = req.body;
  const stmt = 'UPDATE equipes SET nome=?,cidade=?,estado=?,categoria=?,descricao=?,contato=? WHERE id=?';
  db.run(stmt, [nome,cidade,estado,categoria,descricao,contato, req.params.id], function(err){
    if (err) return res.status(500).json({ error: 'db error' });
    db.get('SELECT * FROM equipes WHERE id = ?', [req.params.id], (e,row)=> res.json(row));
  });
});

app.delete('/api/equipes/:id', authenticate, (req, res) => {
  db.run('DELETE FROM equipes WHERE id = ?', [req.params.id], function(err){
    if (err) return res.status(500).json({ error: 'db error' });
    res.json({ deleted: this.changes });
  });
});

app.get('/api/premios', (req, res) => {
  db.all('SELECT * FROM premios ORDER BY categoria, nome', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'db error' });
    res.json(rows);
  });
});

app.get('/api/premios/:id', (req, res) => {
  db.get('SELECT * FROM premios WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error' });
    if (!row) return res.status(404).json({ error: 'not found' });
    res.json(row);
  });
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use((req,res)=> res.status(404).json({ error: 'not found' }));

app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));