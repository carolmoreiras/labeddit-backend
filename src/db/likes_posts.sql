-- Active: 1685401253768@@127.0.0.1@3306
CREATE TABLE likes_posts (
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  like BOOLEAN NOT NULL,
  Foreign Key (post_id) REFERENCES posts(id),
  Foreign Key (user_id) REFERENCES users(id)
);

SELECT * FROM likes_posts;

DROP Table likes_posts;