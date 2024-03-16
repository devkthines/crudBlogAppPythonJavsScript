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