-- Active: 1685401253768@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT NOT NULL UNIQUE PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  allowed_contact BOOLEAN NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

SELECT * FROM users;

DROP TABLE users;