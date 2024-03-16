const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('blog.db');

// User Model
const User = {
  createUser: (username, email, password, bio) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (username, email, password, bio) VALUES (?, ?, ?, ?)', [username, email, password, bio], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  },
  getUsers: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', (err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
    });
  },
  updateUser: (id, username, email, password, bio) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE users SET username = ?, email = ?, password = ?, bio = ? WHERE id = ?', [username, email, password, bio, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};

// Post Model
const Post = {
  createPost: (title, content, userId) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  },
  getPosts: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT p.*, u.username AS user_username FROM posts p JOIN users u ON p.user_id = u.id', (err, posts) => {
        if (err) {
          reject(err);
        } else {
          resolve(posts);
        }
      });
    });
  },
  updatePost: (id, title, content) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  deletePost: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM posts WHERE id = ?', id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};

// Comment Model
const Comment = {
  createComment: (content, postId, userId) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)', [content, postId, userId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  },
  getComments: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT c.*, u.username AS user_username FROM comments c JOIN users u ON c.user_id = u.id', (err, comments) => {
        if (err) {
          reject(err);
        } else {
          resolve(comments);
        }
      });
    });
  },
  updateComment: (id, content) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE comments SET content = ? WHERE id = ?', [content, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  deleteComment: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM comments WHERE id = ?', id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};

module.exports = { User, Post, Comment };