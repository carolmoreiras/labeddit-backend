-- Active: 1685401253768@@127.0.0.1@3306
CREATE TABLE comments (
  id TEXT NOT NULL UNIQUE PRIMARY KEY,
  creator_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT(0) NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
  Foreign Key (creator_id) REFERENCES users(id),
  Foreign Key (post_id) REFERENCES posts(id)
);

SELECT * FROM comments;

DROP TABLE comments;