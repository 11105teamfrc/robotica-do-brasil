const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbFile = path.join(__dirname,'data.db');
if (fs.existsSync(dbFile)) {
  console.log('Removing existing data.db');
  fs.unlinkSync(dbFile);
}
const db = new sqlite3.Database(dbFile);

db.serialize(()=>{
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT
  )`);

  db.run(`CREATE TABLE equipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cidade TEXT,
    estado TEXT,
    categoria TEXT,
    descricao TEXT,
    contato TEXT
  )`);

  db.run(`CREATE TABLE premios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    categoria TEXT,
    descricao TEXT
  )`);

  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const password = 'admin123';
  bcrypt.hash(password, saltRounds).then(hash=>{
    db.run('INSERT INTO users (username,password_hash) VALUES (?,?)', ['admin', hash]);
    console.log('Created user admin / password: admin123');
  });

  const equipes = [
    ['Equipe RobosBR', 'São Paulo', 'SP', 'FLL', 'Equipe de São Paulo', 'contato@robos.br'],
    ['Team Nordeste', 'Recife', 'PE', 'FTC', 'Equipe do Nordeste', 'nordeste@example.com']
  ];
  const stmt = db.prepare('INSERT INTO equipes (nome,cidade,estado,categoria,descricao,contato) VALUES (?,?,?,?,?,?)');
  equipes.forEach(e=> stmt.run(e));
  stmt.finalize();

  const premios = [
    ['Melhor Projeto', 'FLL', 'Projeto com maior impacto'],
    ['Design', 'FTC', 'Melhor engenharia e design']
  ];
  const ps = db.prepare('INSERT INTO premios (nome,categoria,descricao) VALUES (?,?,?)');
  premios.forEach(p=> ps.run(p));
  ps.finalize();

  db.close();
  console.log('Database initialized.');
});