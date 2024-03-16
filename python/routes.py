from flask import Blueprint, jsonify, request
from database import get_db
from models import User, Post, Comment

bp = Blueprint('routes', __name__)

@bp.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        db = get_db()
        users = db.execute('SELECT * FROM users').fetchall()
        db.close()
        return jsonify([dict(user) for user in users])
    elif request.method == 'POST':
        data = request.get_json()
        user = User(data['username'], data['email'], data['password'], data['bio'])
        db = get_db()
        db.execute('INSERT INTO users (username, email, password, bio) VALUES (?, ?, ?, ?)',
                   (user.username, user.email, user.password, user.bio))
        db.commit()
        user_id = db.execute('SELECT last_insert_rowid()').fetchone()[0]
        db.close()
        return jsonify({'id': user_id}), 201

@bp.route('/api/users/<int:user_id>', methods=['PUT', 'DELETE'])
def user(user_id):
    db = get_db()
    if request.method == 'PUT':
        data = request.get_json()
        db.execute('UPDATE users SET username = ?, email = ?, password = ?, bio = ? WHERE id = ?',
                   (data['username'], data['email'], data['password'], data['bio'], user_id))
        db.commit()
        db.close()
        return jsonify({'message': 'User updated successfully'})
    elif request.method == 'DELETE':
        db.execute('DELETE FROM users WHERE id = ?', (user_id,))
        db.commit()
        db.close()
        return jsonify({'message': 'User deleted successfully'})

@bp.route('/api/posts', methods=['GET', 'POST'])
def posts():
    if request.method == 'GET':
        db = get_db()
        posts = db.execute('SELECT * FROM posts').fetchall()
        db.close()
        return jsonify([dict(post) for post in posts])
    elif request.method == 'POST':
        data = request.get_json()
        post = Post(data['title'], data['content'], data['userId'])
        db = get_db()
        db.execute('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
                   (post.title, post.content, post.user_id))
        db.commit()
        post_id = db.execute('SELECT last_insert_rowid()').fetchone()[0]
        db.close()
        return jsonify({'id': post_id}), 201

@bp.route('/api/posts/<int:post_id>', methods=['PUT', 'DELETE'])
def post(post_id):
    db = get_db()
    if request.method == 'PUT':
        data = request.get_json()
        db.execute('UPDATE posts SET title = ?, content = ? WHERE id = ?',
                   (data['title'], data['content'], post_id))
        db.commit()
        db.close()
        return jsonify({'message': 'Post updated successfully'})
    elif request.method == 'DELETE':
        db.execute('DELETE FROM posts WHERE id = ?', (post_id,))
        db.commit()
        db.close()
        return jsonify({'message': 'Post deleted successfully'})

@bp.route('/api/comments', methods=['GET', 'POST'])
def comments():
    if request.method == 'GET':
        db = get_db()
        comments = db.execute('SELECT * FROM comments').fetchall()
        db.close()
        return jsonify([dict(comment) for comment in comments])
    elif request.method == 'POST':
        data = request.get_json()
        comment = Comment(data['content'], data['postId'], data['userId'])
        db = get_db()
        db.execute('INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)',
                   (comment.content, comment.post_id, comment.user_id))
        db.commit()
        comment_id = db.execute('SELECT last_insert_rowid()').fetchone()[0]
        db.close()
        return jsonify({'id': comment_id}), 201

@bp.route('/api/comments/<int:comment_id>', methods=['PUT', 'DELETE'])
def comment(comment_id):
    db = get_db()
    if request.method == 'PUT':
        data = request.get_json()
        db.execute('UPDATE comments SET content = ? WHERE id = ?',
                   (data['content'], comment_id))
        db.commit()
        db.close()
        return jsonify({'message': 'Comment updated successfully'})
    elif request.method == 'DELETE':
        db.execute('DELETE FROM comments WHERE id = ?', (comment_id,))
        db.commit()
        db.close()
        return jsonify({'message': 'Comment deleted successfully'})