-- Active: 1685401253768@@127.0.0.1@3306
CREATE TABLE likes_comments (
  comment_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  like BOOLEAN NOT NULL,
  Foreign Key (comment_id) REFERENCES comments(id),
  Foreign Key (user_id) REFERENCES users(id)
);

SELECT * FROM likes_comments;

DROP Table likes_comments;